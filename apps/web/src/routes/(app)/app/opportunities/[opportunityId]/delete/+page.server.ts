import { error, fail } from '@sveltejs/kit';
import { schema } from '@opensource-startup-crm/database';
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
    const userId = locals.user?.id;
    const organizationId = locals.org?.id;
    const db = locals.db

    if (!userId || !organizationId) {
        throw error(401, 'Unauthorized');
    }

    const [row] = await db
        .select({
            id: schema.opportunity.id,
            name: schema.opportunity.name,
            amount: schema.opportunity.amount,
            stage: schema.opportunity.stage,
            account: {
                id: schema.opportunity.accountId,
                name: schema.crmAccount.name,
                type: schema.crmAccount.type
            },
            owner: {
                id: schema.opportunity.ownerId,
                name: schema.user.name,
                email: schema.user.email
            }
        })
        .from(schema.opportunity)
        .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.opportunity.accountId))
        .leftJoin(schema.user, eq(schema.user.id, schema.opportunity.ownerId))
        .where(and(eq(schema.opportunity.id, params.opportunityId), eq(schema.opportunity.organizationId, organizationId!)));

    if (!row) {
        throw error(404, 'Opportunity not found');
    }

    return { opportunity: row };
}

export const actions: Actions = {
    default: async ({ params, locals }) => {
        try {
            const userId = locals.user?.id;
            const organizationId = locals.org?.id;
            const db = locals.db

            if (!userId || !organizationId) {
                return fail(401, { message: 'Unauthorized' });
            }

            // Check if the opportunity exists and belongs to the user's organization
            const [opportunity] = await db
                .select({ id: schema.opportunity.id })
                .from(schema.opportunity)
                .where(and(eq(schema.opportunity.id, params.opportunityId), eq(schema.opportunity.organizationId, organizationId!)));

            if (!opportunity) {
                return fail(404, { message: 'Opportunity not found' });
            }

            // Delete the opportunity (this will cascade delete related records)
            await db.delete(schema.opportunity).where(eq(schema.opportunity.id, params.opportunityId));

            // Return success response - let client handle redirect
            return { success: true, message: 'Opportunity deleted successfully' };
        } catch (err) {
            console.error('Error deleting opportunity:', err);
            return fail(500, { message: 'Failed to delete opportunity' });
        }
    }
};
