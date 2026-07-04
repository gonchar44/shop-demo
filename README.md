# Shop Demo

`shop-demo` is a small e-commerce demo built with Next.js. It currently includes
a product catalog backed by PostgreSQL through Prisma.

**[→ Live Site](https://shop-demo-xi.vercel.app/)**

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma
- PostgreSQL 16, run locally with Docker
- npm

## Prerequisites

Before starting the project, make sure you have:

- Node.js 20.9 or newer
- npm
- Docker Desktop or Docker Engine with Docker Compose

Docker is required for the local PostgreSQL database. The app expects a running
database before Prisma migrations, seeding, and catalog pages can work.

## Environment Variables

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

Default local values:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/shop_demo?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

The database URL matches the PostgreSQL service defined in `docker-compose.yml`.

## Local Setup

Install dependencies:

```bash
npm install
```

Start the PostgreSQL database with Docker:

```bash
npm run db:start
```

Apply Prisma migrations:

```bash
npm run db:migrate:dev
```

Seed the database:

```bash
npm run db:seed
```

Start the Next.js development server:

```bash
npm run dev
```

Open the app in your browser:

- Home: [http://localhost:3000](http://localhost:3000)
- Catalog: [http://localhost:3000/catalog](http://localhost:3000/catalog)

## Useful Scripts

```bash
npm run dev
```

Start the local Next.js development server.

```bash
npm run build
```

Create a production build.

```bash
npm run start
```

Start the production server after a successful build.

```bash
npm run lint
```

Run ESLint.

```bash
npm run format:check
```

Check formatting with Prettier.

```bash
npm run format:fix
```

Format supported project files with Prettier.

## Database Scripts

```bash
npm run db:start
```

Start PostgreSQL in Docker.

```bash
npm run db:stop
```

Stop the Docker database container.

```bash
npm run db:migrate:dev
```

Run Prisma migrations in development.

```bash
npm run db:migrate
```

Apply existing Prisma migrations without creating a new migration.

```bash
npm run db:seed
```

Seed the database with demo catalog data.

```bash
npm run db:studio
```

Open Prisma Studio for inspecting local data.

```bash
npm run db:reset
```

Reset the local database, rerun migrations, and reseed data.

## Troubleshooting

If Prisma cannot connect to the database, check that Docker is running and then
start the database again:

```bash
npm run db:start
```

If port `5433` is already in use, stop the process using it or update both
`docker-compose.yml` and `DATABASE_URL` to use another local port.

If catalog pages are empty after setup, rerun the seed:

```bash
npm run db:seed
```

## Reviewer Checklist

For a fresh local review, the expected setup flow is:

```bash
npm install
cp .env.example .env.local
npm run db:start
npm run db:migrate:dev
npm run db:seed
npm run dev
```
