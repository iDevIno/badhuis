// Run with: node --test tests/news-upload.mjs
// Real Blob SDK, local test credentials and intercepted HTTP: no cloud writes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { MockAgent, setGlobalDispatcher, getGlobalDispatcher } from 'undici';
import * as blobClient from '@vercel/blob/client';

function load(path, imports, globals = {}) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(source, { exports, require: name => imports[name], Response, File, FormData, URL, Error, AbortController, setTimeout, clearTimeout, ...globals });
  return exports;
}

const image = load('src/lib/news-image.ts', {});
const token = 'vercel_blob_rw_teststore_localtestsecret';
function route(env, session = { user: { email: 'test@example.test' } }) {
  return load('src/app/api/nieuws/upload/route.ts', {
    '@vercel/blob/client': blobClient,
    '@/auth': { auth: async () => session },
    '@/lib/news-image': image,
  }, { process: { env } });
}
function request(body) { return { json: async () => body }; }
const body = { type: 'blob.generate-client-token', payload: { pathname: 'nieuws/foto.jpg', multipart: false } };

test('token endpoint rejects missing sessions, missing/invalid credentials and invalid paths', async () => {
  assert.equal((await route({}, null).POST(request(body))).status, 401);
  assert.equal((await route({}).POST(request(body))).status, 503);
  const invalid = await route({ BLOB_READ_WRITE_TOKEN: 'placeholder' }).POST(request(body));
  assert.equal(invalid.status, 503);
  assert.match((await invalid.json()).error, /ongeldig/);
  assert.equal((await route({ BLOB_READ_WRITE_TOKEN: token }).POST(request({ ...body, payload: { pathname: '../foto.jpg' } }))).status, 400);
});

test('3.2 MB image uses a real signed client token and bypasses the form payload', async () => {
  const agent = new MockAgent();
  const previousDispatcher = getGlobalDispatcher();
  agent.disableNetConnect();
  setGlobalDispatcher(agent);
  try {
    let uploadedBytes = 0;
    agent.get('https://vercel.com').intercept({ path: /\/api\/blob\/\?/, method: 'PUT' }).reply(options => {
      uploadedBytes = options.body.size ?? options.body.length ?? options.body.byteLength;
      return { statusCode: 200, data: JSON.stringify({ url: 'https://teststore.public.blob.vercel-storage.com/nieuws/foto.jpg', pathname: 'nieuws/foto.jpg', contentType: 'image/jpeg', contentDisposition: 'inline' }), responseOptions: { headers: { 'content-type': 'application/json' } } };
    });
    const api = route({ BLOB_READ_WRITE_TOKEN: token });
    let signedPayload;
    const client = load('src/lib/upload-news-image.ts', { '@vercel/blob/client': blobClient }, {
      fetch: async (_url, init) => {
        const result = await api.POST(request(JSON.parse(init.body)));
        const json = await result.clone().json();
        assert.match(json.clientToken, /^vercel_blob_client_teststore_/);
        const signed = Buffer.from(json.clientToken.split('_')[4], 'base64').toString();
        signedPayload = JSON.parse(Buffer.from(signed.split('.')[1], 'base64').toString());
        return result;
      },
    });
    const size = Math.round(3.2 * 1024 * 1024);
    const data = new FormData();
    data.set('image', new File([new Uint8Array(size)], 'foto.jpg', { type: 'image/jpeg' }));
    await image.prepareNewsImage(data, async file => (await client.uploadNewsImage(file)).url);
    assert.equal(uploadedBytes, size);
    assert.equal(data.has('image'), false);
    assert.match(data.get('uploadedImage'), /^https:/);
    assert.equal(signedPayload.maximumSizeInBytes, 5 * 1024 * 1024);
    assert.deepEqual(signedPayload.allowedContentTypes, ['image/jpeg', 'image/png', 'image/webp']);
    assert.equal(signedPayload.allowOverwrite, false);
    agent.assertNoPendingInterceptors();
  } finally {
    setGlobalDispatcher(previousDispatcher);
    await agent.close();
  }
});


test('a stalled upload releases the form even while the SDK is waiting to retry', async () => {
  let onDeadline;
  let signal;
  const client = load('src/lib/upload-news-image.ts', {
    '@vercel/blob/client': { put: async (_path, _file, options) => { signal = options.abortSignal; return new Promise(() => {}); } },
  }, {
    fetch: async () => Response.json({ clientToken: 'test' }),
    setTimeout: callback => { onDeadline = callback; return 1; },
    clearTimeout: () => {},
  });
  const pending = client.uploadNewsImage(new File(['test'], 'foto.jpg', { type: 'image/jpeg' }));
  // Wait for the mocked HTTP response to be parsed, without a real timer delay.
  for (let i = 0; i < 20 && !signal; i++) await Promise.resolve();
  onDeadline();
  await assert.rejects(pending, /duurt te lang/);
  assert.equal(signal.aborted, true);
});
