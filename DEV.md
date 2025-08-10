## BottleCRM Dev Guide

- Never use `$app` from SvelteKit. See: https://kit.svelte.dev/docs/packaging#best-practices

### Monorepo

- Package manager: pnpm
- Workspaces:
  - `apps/web` (SvelteKit)
  - `apps/api` (Express/Node)
  - `shared/database` (Drizzle ORM + Drizzle Kit migrations)

### Node/Tooling

- Node: `nvm use 22.13.0`
- Install: `pnpm install`

### Database (Drizzle)

- Generate SQL and types: `pnpm --filter @opensource-startup-crm/database db:generate`
- Dev migrations: `pnpm --filter @opensource-startup-crm/database db:migrate:local`
- Prod migrations: `pnpm --filter @opensource-startup-crm/database db:migrate:prod`
- Studio: `pnpm --filter @opensource-startup-crm/database db:studio`

#### Drizzle workflow

- Edit schema in `shared/database/src/schema/*`.
- Generate migration + types:
  - From repo root: `pnpm db:generate`
  - Or inside package: `pnpm --filter @opensource-startup-crm/database db:generate`
- Apply migrations locally:
  - From root: `pnpm db:migrate:local`
- Apply migrations in prod:
  - From root: `pnpm db:migrate:prod`
- One-shot (generate + migrate + build):
  - Local: `pnpm --filter @opensource-startup-crm/database db:gmb:local`
  - Prod: `pnpm --filter @opensource-startup-crm/database db:gmb:prod`

Notes

- Drizzle config: `shared/database/drizzle.config.ts`
- Migrations output: `shared/database/migrations/`
- Ensure database env vars are set before running commands (wrangler `.dev.vars` or system env).

### Development

- Run Web (SvelteKit): `pnpm --filter @opensource-startup-crm/web dev`
- Run API: `pnpm --filter @opensource-startup-crm/api dev`

Or use root scripts:

- Web dev: `pnpm web:dev`
- Web build: `pnpm web:build`
- Web preview: `pnpm web:preview`
- API dev: `pnpm api:dev`
- API build: `pnpm api:build`

### Lint/Type/Build

- Type check: `pnpm --filter @opensource-startup-crm/web check`
- Lint: `pnpm --filter @opensource-startup-crm/web lint`
- Build: `pnpm --filter @opensource-startup-crm/web build`

### Pre-commit checklist

- `pnpm -r run lint`
- `pnpm -r run build`
- `pnpm --filter @opensource-startup-crm/web check`
