import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { and, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
  const db = locals.db
  const [account] = await db
    .select()
    .from(schema.crmAccount)
    .where(and(eq(schema.crmAccount.id, params.accountId), eq(schema.crmAccount.organizationId, locals.org!.id)) as any);
  if (!account) throw error(404, 'Account not found');
  return { account };
};

export const actions: Actions = {
  default: async ({ request, params, locals }) => {
    const org = locals.org!;
    const form = await request.formData();
    const name = form.get('name')?.toString();
    const industry = form.get('industry')?.toString() || null;
    const type = form.get('type')?.toString() || null;
    const website = form.get('website')?.toString() || null;
    const phone = form.get('phone')?.toString() || null;

    if (!name) {
      return fail(400, { name, missing: true });
    }

    const db = locals.db

    await db
      .update(schema.crmAccount)
      .set({ name, industry, type, website, phone })
      .where(and(eq(schema.crmAccount.id, params.accountId), eq(schema.crmAccount.organizationId, org.id)) as any);
    throw redirect(303, `/app/accounts/${params.accountId}`);
  }
};
