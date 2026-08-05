# Badhuis General Practice

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Configure `.env.local`, then initialize the database:

```bash
npm run db:migrate
```

## Checks

```bash
npm run lint
npm run build
```
