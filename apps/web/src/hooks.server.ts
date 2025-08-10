import { error, redirect, type Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { createAuth } from '$lib/auth';
import { getDb, schema } from '@opensource-startup-crm/database';
import { eq } from 'drizzle-orm';
import { sequence } from '@sveltejs/kit/hooks';

const handleAuth: Handle = async ({ event, resolve }) => {
  const env = event.platform?.env;
  if (!env) throw error(500, 'Platform env is not defined');
  const db = getDb(env);
  event.locals.db = db;
  event.locals.auth = createAuth(env, db);

  const auth = event.locals.auth as ReturnType<typeof createAuth>;
  const sessionData: { user: App.Locals['user']; session: App.Locals['session'] } | null =
    await auth.api.getSession({ headers: event.request.headers });
  event.locals.user = sessionData?.user ?? null;
  event.locals.session = sessionData?.session ?? null;
  return resolve(event);
};

// Resolve org from activeOrganizationId and apply route guards
const handleOrgAndGuards: Handle = async ({ event, resolve }) => {
  const db = event.locals.db as ReturnType<typeof getDb>;
  if (event.locals.user && event.locals.session?.activeOrganizationId) {
    const activeOrgId = event.locals.session.activeOrganizationId as string;
    const [org] = await db
      .select({ id: schema.organization.id, name: schema.organization.name })
      .from(schema.organization)
      .where(eq(schema.organization.id, activeOrgId));
    event.locals.org = org ?? null;
  } else {
    event.locals.org = null;
  }
  if (event.url.pathname.startsWith('/app')) {
    if (!event.locals.user) throw redirect(307, '/login');
    if (!event.locals.org) throw redirect(307, '/org');
  } else if (event.url.pathname.startsWith('/admin')) {
    if (!event.locals.user) throw redirect(307, '/login');
    if (!event.locals.user?.email) {
      throw redirect(307, '/app');
    }
  } else if (event.url.pathname.startsWith('/org')) {
    if (!event.locals.user) throw redirect(307, '/login');
  }
  return resolve(event);
};

export const handle = sequence(
  handleAuth,
  ({ event, resolve }) => svelteKitHandler({ event, resolve, auth: event.locals.auth, building }),
  handleOrgAndGuards
);
