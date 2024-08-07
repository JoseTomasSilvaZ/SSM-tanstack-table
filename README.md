### Installation

Clone the project

```bash
  git clone https://github.com/JoseTomasSilvaZSSM-tanstack-table
```

Install dependencies

```bash
  npm install
```

Modify `.env.sample` file and rename it to `.env`

```bash
  mv .env.sample .env
```

Setup prisma and database

```bash
  npx prisma generate && npx prisma migrate dev
  node prisma/seed.mjs
```

Run the project

```bash
  npm run dev
```
