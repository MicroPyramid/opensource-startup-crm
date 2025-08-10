import { schema } from '@opensource-startup-crm/database';
import { fail, redirect } from '@sveltejs/kit';
import { validatePhoneNumber, formatPhoneForStorage } from '$lib/utils/phone.js';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(307, '/login');
    }

    const db = locals.db

    // Get user with their organization memberships
    const [user] = await db
        .select({
            id: schema.user.id,
            email: schema.user.email,
            name: schema.user.name,
            image: schema.user.image,
            phone: schema.user.phone,
            isActive: schema.user.isActive,
            lastLogin: schema.user.lastLogin,
            createdAt: schema.user.createdAt
        })
        .from(schema.user)

        .where(eq(schema.user.id, locals.user.id));

    const orgMemberships = await db
        .select({
            organizationId: schema.member.organizationId,
            organizationName: schema.organization.name,
            role: schema.member.role,
            joinedAt: schema.member.createdAt
        })
        .from(schema.member)
        .innerJoin(schema.organization, eq(schema.organization.id, schema.member.organizationId))
        .where(eq(schema.member.userId, locals.user.id));

    if (!user) {
        throw redirect(307, '/login');
    }

    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            phone: user.phone,
            isActive: user.isActive,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
            organizations: orgMemberships.map((m) => ({ organization: { id: m.organizationId, name: m.organizationName }, role: m.role, joinedAt: m.joinedAt }))
        }
    };
}

export const actions: Actions = {
    updateProfile: async ({ request, locals }) => {
        if (!locals.user) {
            throw redirect(307, '/login');
        }

        const db = locals.db

        const formData = await request.formData();
        const name = formData.get('name')?.toString();
        const phone = formData.get('phone')?.toString();

        // Validate required fields
        if (!name || name.trim().length === 0) {
            return fail(400, {
                error: 'Name is required',
                data: { name, phone }
            });
        }

        if (name.trim().length < 2) {
            return fail(400, {
                error: 'Name must be at least 2 characters long',
                data: { name, phone }
            });
        }

        // Validate phone if provided
        let formattedPhone = null;
        if (phone && phone.trim().length > 0) {
            const phoneValidation = validatePhoneNumber(phone.trim());
            if (!phoneValidation.isValid) {
                return fail(400, {
                    error: phoneValidation.error || 'Please enter a valid phone number',
                    data: { name, phone }
                });
            }
            formattedPhone = formatPhoneForStorage(phone.trim());
        }

        try {
            await db
                .update(schema.user)
                .set({ name: name.trim(), phone: formattedPhone, updatedAt: new Date() })
                .where(eq(schema.user.id, locals.user.id));

            return {
                success: true,
                message: 'Profile updated successfully'
            };
        } catch (error) {
            console.error('Error updating profile:', error);
            return fail(500, {
                error: 'Failed to update profile. Please try again.',
                data: { name, phone }
            });
        }
    }
};