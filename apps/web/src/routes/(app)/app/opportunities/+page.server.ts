import { schema } from '@opensource-startup-crm/database';
import { fail } from '@sveltejs/kit';
import { and, desc, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const db = locals.db
    try {
        // Fetch opportunities with joins
        const rows = await db
            .select({
                id: schema.opportunity.id,
                name: schema.opportunity.name,
                amount: schema.opportunity.amount,
                expectedRevenue: schema.opportunity.expectedRevenue,
                stage: schema.opportunity.stage,
                type: schema.opportunity.type,
                probability: schema.opportunity.probability,
                closeDate: schema.opportunity.closeDate,
                createdAt: schema.opportunity.createdAt,
                account: {
                    id: schema.crmAccount.id,
                    name: schema.crmAccount.name,
                    type: schema.crmAccount.type,
                },
                owner: {
                    id: schema.user.id,
                    name: schema.user.name,
                    email: schema.user.email,
                },
                _count: {
                    tasks: db.$count(schema.task, eq(schema.task.opportunityId, schema.opportunity.id)),
                    events: db.$count(schema.event, eq(schema.event.opportunityId, schema.opportunity.id))
                }
            })
            .from(schema.opportunity)
            .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.opportunity.accountId))
            .leftJoin(schema.user, eq(schema.user.id, schema.opportunity.ownerId))
            .where(eq(schema.opportunity.organizationId, locals.org!.id))
            .orderBy(desc(schema.opportunity.createdAt));

        // Calculate stats
        const stats = {
            total: rows.length,
            totalValue: rows.reduce((sum, opp) => sum + (Number(opp.amount) || 0), 0),
            wonValue: rows
                .filter(opp => opp.stage === 'CLOSED_WON')
                .reduce((sum, opp) => sum + (Number(opp.amount) || 0), 0),
            pipeline: rows
                .filter(opp => !['CLOSED_WON', 'CLOSED_LOST'].includes(opp.stage))
                .reduce((sum, opp) => sum + (Number(opp.amount) || 0), 0)
        };

        return {
            opportunities: rows,
            stats
        };
    } catch (error) {
        console.error('Error loading opportunities:', error);
        return {
            opportunities: [],
            stats: {
                total: 0,
                totalValue: 0,
                wonValue: 0,
                pipeline: 0
            }
        };
    }
};

export const actions: Actions = {
    delete: async ({ request, locals }) => {
        const db = locals.db
        try {
            const formData = await request.formData();
            const opportunityId = formData.get('opportunityId')?.toString();
            if (!opportunityId) {
                return fail(400, { message: 'Missing required data' });
            }

            const [opportunity] = await db
                .select({ id: schema.opportunity.id })
                .from(schema.opportunity)
                .where(and(eq(schema.opportunity.id, opportunityId), eq(schema.opportunity.organizationId, locals.org!.id)));

            if (!opportunity) {
                return fail(404, { message: 'Opportunity not found' });
            }

            await db.delete(schema.opportunity).where(eq(schema.opportunity.id, opportunityId));

            return { success: true, message: 'Opportunity deleted successfully' };
        } catch (error) {
            console.error('Error deleting opportunity:', error);
            return fail(500, { message: 'Failed to delete opportunity' });
        }
    }
};