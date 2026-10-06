import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const originalPassword = 'Mijn origineel wachtwoord';
const passwordHash = await bcrypt.hash(originalPassword, 4);
const source = ts.transpileModule(fs.readFileSync('src/lib/user-actions.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
function setup({ session = { user: { email: 'ADMIN@example.test' } }, connected = true, exists = true, duplicate = false, concurrent = false } = {}) {
  const events = { inserted: null, updated: null, where: null, revalidated: false };
  const account = { id: 'own-id', email: 'admin@example.test', passwordHash };
  const db = {
    select: () => ({ from: () => ({ where: condition => { assert.deepEqual(condition, ['email', 'admin@example.test']); return { limit: async () => exists ? [account] : [] }; }, orderBy: async () => [{ id: account.id, email: account.email }] }) }),
    insert: () => ({ values: data => { events.inserted = data; return { onConflictDoNothing: () => ({ returning: async () => duplicate ? [] : [{ id: 'new-id' }] }) }; } }),
    update: () => ({ set: data => { events.updated = data; return { where: condition => { events.where = condition; return { returning: async () => concurrent ? [] : [{ id: account.id }] }; } }; } }),
  };
  const imports = {
    bcryptjs: bcrypt, zod: { z },
    'drizzle-orm': { eq: (key, value) => [key, value], and: (...clauses) => clauses, asc: value => value },
    'next/cache': { revalidatePath: () => { events.revalidated = true; } },
    'next/navigation': { redirect: () => { throw new Error('LOGIN_REQUIRED'); } },
    '@/auth': { auth: async () => session }, '@/db': { getDb: () => connected ? db : null },
    '@/db/schema': { admins: { id: 'id', email: 'email', passwordHash: 'passwordHash' } },
  };
  const exports = {};
  vm.runInNewContext(source, { exports, require: name => imports[name], Buffer, Date, Error });
  return { actions: exports, events };
}
function form(overrides = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ email: ' New@Example.test ', password: 'Een nieuw wachtwoord 2026', confirmPassword: 'Een nieuw wachtwoord 2026', currentPassword: originalPassword, ...overrides })) data.set(key, value);
  return data;
}

test('requires an authenticated existing administrator and connected database', async () => {
  for (const options of [{ session: null }, { exists: false }]) {
    const { actions, events } = setup(options);
    await assert.rejects(() => actions.createUserAction({}, form()), /LOGIN_REQUIRED/);
    await assert.rejects(() => actions.changeOwnPasswordAction({}, form()), /LOGIN_REQUIRED/);
    assert.equal(events.inserted, null); assert.equal(events.updated, null);
  }
  assert.match((await setup({ connected: false }).actions.createUserAction({}, form())).error, /database/);
});

test('normalizes new account email and stores only a bcrypt hash; handles duplicates', async () => {
  const { actions, events } = setup();
  assert.ok((await actions.createUserAction({}, form())).success);
  assert.equal(events.inserted.email, 'new@example.test');
  assert.equal(await bcrypt.compare(form().get('password'), events.inserted.passwordHash), true);
  assert.equal(events.revalidated, true);
  assert.match((await setup({ duplicate: true }).actions.createUserAction({}, form())).error, /bestaat al/);
});

test('rejects invalid email, weak passwords, mismatched confirmation and bcrypt truncation', async () => {
  for (const values of [{ email: 'not-an-email' }, { password: 'short' }, { confirmPassword: 'different' }, { password: '🔒'.repeat(19), confirmPassword: '🔒'.repeat(19) }]) {
    const { actions, events } = setup();
    assert.ok((await actions.createUserAction({}, form(values))).error);
    assert.equal(events.inserted, null);
  }
});

test('only changes own password after verifying current password, even with forged target fields', async () => {
  const denied = setup();
  assert.match((await denied.actions.changeOwnPasswordAction({}, form({ currentPassword: 'incorrect' }))).error, /huidige wachtwoord/);
  assert.equal(denied.events.updated, null);
  const { actions, events } = setup();
  assert.ok((await actions.changeOwnPasswordAction({}, form({ id: 'other-id', email: 'other@example.test' }))).success);
  assert.deepEqual(events.where, [['id', 'own-id'], ['passwordHash', passwordHash]]);
  assert.equal(await bcrypt.compare(form().get('password'), events.updated.passwordHash), true);
  assert.equal(await bcrypt.compare(originalPassword, events.updated.passwordHash), false);
  assert.match((await setup({ concurrent: true }).actions.changeOwnPasswordAction({}, form())).error, /ondertussen gewijzigd/);
});

test('user listing does not expose password hashes', async () => {
  const { actions } = setup();
  const listing = await actions.listUsers();
  assert.deepEqual(Object.keys(listing.users[0]), ['id', 'email']);
});
