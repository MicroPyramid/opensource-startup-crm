import type { Actions, PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { and, eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    const user = locals.user;
    const db = locals.db
    if (!user) return { orgs: [] };

    const rows = await db
        .select({
            id: schema.organization.id,
            name: schema.organization.name,
            logo: schema.organization.logo,
            role: schema.member.role
        })
        .from(schema.member)
        .innerJoin(
            schema.organization,
            eq(schema.member.organizationId, schema.organization.id)
        )
        .where(eq(schema.member.userId, user.id));

    const orgs = rows.map((r) => ({ id: r.id, name: r.name, logo: r.logo, role: r.role }));
    return { orgs };
};

export const actions: Actions = {
    select: async ({ request, locals }) => {
        const form = await request.formData();
        const orgId = form.get('orgId')?.toString();
        if (!orgId) return fail(400, { error: 'Organization is required' });

        await locals.auth.api.setActiveOrganization({ body: { organizationId: orgId }, headers: request.headers });

        throw redirect(303, '/app');
    }
};
