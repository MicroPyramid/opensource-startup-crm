import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
type UserRole = 'member' | 'admin' | 'owner';

export const load: PageServerLoad = async ({ locals, request }) => {
    const user = locals.user;
    const orgId = locals.session?.activeOrganizationId;
    if (!user || !orgId) {
        throw redirect(307, '/login');
    }

    // Get organization details and members via Better Auth organization plugin
    const organization = await locals.auth.api.getFullOrganization({ query: { organizationId: orgId }, headers: request.headers });

    return { organization, user: { id: user.id } };
};

export const actions: Actions = {
    update: async ({ request, locals }) => {
        const user = locals.user;
        const orgId = locals.session?.activeOrganizationId;
        if (!user || !orgId) return fail(401, { error: 'Unauthorized' });

        const formData = await request.formData();
        const name = formData.get('name')?.toString().trim();
        const description = formData.get('description')?.toString().trim();
        if (!name) return fail(400, { error: 'Name is required' });

        try {
            await locals.auth.api.updateOrganization({ body: { organizationId: orgId, data: { name, description } }, headers: request.headers });
            return { success: true };
        } catch {
            return fail(500, { error: 'Failed to update organization' });
        }
    },

    add_user: async ({ request, locals }) => {
        const user = locals.user;
        const orgId = locals.session?.activeOrganizationId;
        if (!user || !orgId) return fail(401, { error: 'Unauthorized' });

        const formData = await request.formData();
        const userId = formData.get('user_id')?.toString().trim();
        const role = formData.get('role')?.toString() as UserRole;
        if (!userId || !role) return fail(400, { error: 'User and role are required' });

        try {
            await locals.auth.api.addMember({ body: { organizationId: orgId, userId, role }, headers: request.headers });
            return { success: true };
        } catch {
            return fail(500, { error: 'Failed to add user' });
        }
    },

    edit_role: async ({ request, locals }) => {
        const user = locals.user;
        const orgId = locals.session?.activeOrganizationId;
        if (!user || !orgId) return fail(401, { error: 'Unauthorized' });

        const formData = await request.formData();
        const member_id = formData.get('member_id')?.toString();
        const role = formData.get('role')?.toString() as UserRole;
        if (!member_id || !role) return fail(400, { error: 'Member and role are required' });

        try {
            await locals.auth.api.updateMemberRole({ body: { organizationId: orgId, memberId: member_id, role }, headers: request.headers });
            return { success: true };
        } catch {
            return fail(500, { error: 'Failed to update role' });
        }
    },

    remove_user: async ({ request, locals }) => {
        const user = locals.user;
        const orgId = locals.session?.activeOrganizationId;
        if (!user || !orgId) return fail(401, { error: 'Unauthorized' });

        const formData = await request.formData();
        const member_id = formData.get('member_id')?.toString();
        if (!member_id) return fail(400, { error: 'Member is required' });

        try {
            await locals.auth.api.removeMember({ body: { organizationId: orgId, memberIdOrEmail: member_id }, headers: request.headers });
            return { success: true };
        } catch {
            return fail(500, { error: 'Failed to remove user' });
        }
    }
};
