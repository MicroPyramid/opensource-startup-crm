# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BottleCRM is a multi-tenant SaaS CRM platform built as a monorepo with SvelteKit, designed for startups and enterprises with role-based access control (RBAC). The application features organization-based multi-tenancy with strict data isolation enforced at the database level.

## Technology Stack

- **Frontend**: SvelteKit 2.x with Svelte 5.x (TypeScript)
- **Styling**: TailwindCSS 4.x
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with organization plugin
- **Icons**: Lucide Svelte
- **Validation**: Zod
- **Package Manager**: pnpm (v10.0.0)
- **Build Tool**: Turbo (monorepo management)
- **Deployment**: Cloudflare Workers/Pages

## Monorepo Structure

```
├── apps/
│   ├── web/          # SvelteKit frontend application
│   └── api/          # Node.js API service (optional)
├── shared/
│   ├── database/     # Drizzle ORM schema and migrations
│   └── constants/    # Shared constants across apps
└── supabase/         # Supabase configuration (if used)
```

## Development Commands

### Monorepo Root Commands
```bash
# Install dependencies
pnpm install

# Development (all apps)
pnpm run dev

# Build (all apps)
pnpm run build

# Web app specific
pnpm run web:dev
pnpm run web:build
pnpm run web:preview

# API app specific
pnpm run api:dev
pnpm run api:build
```

### Database Commands
```bash
# Generate SQL and types
pnpm run db:generate

# Run migrations (local)
pnpm run db:migrate:local

# Run migrations (production)
pnpm run db:migrate:prod

# Generate, migrate, build in one command (local)
pnpm run db:gmb:local

# Database studio UI
pnpm run db:studio
```

### Web App Commands (from apps/web/)
```bash
# Type checking
pnpm run check
pnpm run check:watch

# Linting and formatting
pnpm run lint
pnpm run format
```

## Architecture Overview

### Multi-Tenant Structure
- **Organizations**: Top-level tenant containers with complete data isolation
- **Members**: Users belong to organizations with specific roles (member/admin)
- **Sessions**: Track active organization via `activeOrganizationId`
- **Super Admin**: Platform-wide access (determined by business logic, not email domain)

### Core CRM Entities
- **Leads**: Initial prospects that can be converted to Accounts/Contacts/Opportunities
- **Accounts** (`crm_account`): Company/organization records
- **Contacts**: Individual people associated with accounts
- **Opportunities**: Sales deals with pipeline stages and forecast categories
- **Tasks/Events**: Activity management linked to various entities
- **Cases**: Customer support tickets with priority and status tracking
- **Products/Quotes**: Product catalog and professional quotation system

### Authentication & Authorization
- **Better Auth**: Session-based authentication with JWT plugin support
- **Organization Context**: Active organization stored in session (`activeOrganizationId`)
- **Route Protection** in `apps/web/src/hooks.server.ts`:
  - `/app/*` routes require authentication and organization membership
  - `/admin/*` routes require authentication (additional checks in route logic)
  - `/org` route for organization selection post-login
- **Database Integration**: Drizzle adapter for Better Auth tables

### Data Access Control
- All CRM queries must filter by `organizationId`
- Organization membership verified through `member` table
- Strict foreign key constraints enforce data integrity
- Audit logging tracks all data modifications

### Route Structure
- `(site)`: Public marketing pages
- `(no-layout)`: Authentication pages (login, org selection)
- `(app)`: Main CRM application (requires auth + active org)
- `(admin)`: Platform administration

### Key Files
- `apps/web/src/hooks.server.ts`: Authentication setup and route guards
- `apps/web/src/lib/auth.ts`: Better Auth configuration
- `shared/database/src/schema/`: Database schema definitions
  - `base.ts`: Authentication tables (user, session, organization, member)
  - `app.ts`: CRM-specific tables
  - `enums.ts`: PostgreSQL enums for type safety

## Environment Configuration

### Local Development (.dev.vars)
Create `apps/web/.dev.vars` for local development:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/bottlecrm?schema=public"
BASE_URL="http://localhost:5173"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### Production (wrangler.jsonc)
Configure in `apps/web/wrangler.jsonc` under `vars` section or use Cloudflare Secrets.

## Database Schema Patterns

### Entity Conventions
- Primary keys: `id` (UUID via `randomUUID()`)
- Timestamps: `createdAt`, `updatedAt` with defaults
- Soft deletes: `isDeleted`, `deletedAt`, `deletedById`
- Organization scoping: `organizationId` foreign key
- Owner tracking: `ownerId` references user

### Enum Usage
All enums defined in `shared/database/src/schema/enums.ts`:
- `leadStatus`, `leadSource`
- `opportunityStage`, `opportunityType`
- `taskStatus`, `taskPriority`
- `caseStatus`, `quoteStatus`
- Industry, rating, and other business enums

## Form Development
- Use proper TypeScript types for form data
- Implement Zod schemas for validation
- Ensure all form controls have associated labels
- Follow existing patterns in the codebase

## Testing Strategy
- Run `pnpm run check` before committing
- Ensure `pnpm run lint` passes
- Build verification with `pnpm run build`

## Security Requirements
- Never expose cross-organization data
- Always include `organizationId` in queries
- Validate organization membership before data access
- Use Drizzle's parameterized queries
- Audit sensitive operations