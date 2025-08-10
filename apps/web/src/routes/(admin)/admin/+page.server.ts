import type { PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { and, gte, inArray, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
    try {
        const db = locals.db;
        // Get basic counts
        const [
            totalUsers,
            totalOrganizations,
            totalAccounts,
            totalContacts,
            totalLeads,
            totalOpportunities,
            totalTasks,
            totalCases
        ] = await Promise.all([
            db.$count(schema.user, eq(schema.user.banned, false) as any),
            db.$count(schema.organization),
            db.$count(schema.crmAccount, and(eq(schema.crmAccount.isActive, true), eq(schema.crmAccount.isDeleted, false))),
            db.$count(schema.contact),
            db.$count(schema.lead),
            db.$count(schema.opportunity),
            db.$count(schema.task),
            db.$count(schema.caseTable)
        ]);

        // Get opportunity metrics
        const [wonOpportunities, openOpportunities] = await Promise.all([
            db.$count(schema.opportunity, eq(schema.opportunity.stage, 'CLOSED_WON' as any)),
            db.$count(
                schema.opportunity,
                inArray(schema.opportunity.stage as any, ['PROSPECTING', 'QUALIFICATION', 'PROPOSAL', 'NEGOTIATION'])
            )
        ]);

        // Get recent activity (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const [
            newAccountsThisMonth,
            newLeadsThisMonth,
            newOpportunitiesThisMonth,
            tasksCompletedThisMonth
        ] = await Promise.all([
            db.$count(
                schema.crmAccount,
                and(
                    gte(schema.crmAccount.createdAt, thirtyDaysAgo as any),
                    eq(schema.crmAccount.isActive, true),
                    eq(schema.crmAccount.isDeleted, false)
                )
            ),
            db.$count(schema.lead, gte(schema.lead.createdAt, thirtyDaysAgo as any)),
            db.$count(schema.opportunity, gte(schema.opportunity.createdAt, thirtyDaysAgo as any)),
            db.$count(schema.task, and(gte(schema.task.updatedAt, thirtyDaysAgo as any), eq(schema.task.status, 'COMPLETED' as any)))
        ]);

        return {
            metrics: {
                totalUsers,
                totalOrganizations,
                totalAccounts,
                totalContacts,
                totalLeads,
                totalOpportunities,
                totalTasks,
                totalCases,
                wonOpportunities,
                openOpportunities,
                newAccountsThisMonth,
                newLeadsThisMonth,
                newOpportunitiesThisMonth,
                tasksCompletedThisMonth
            }
        };
    } catch (error) {
        console.error('Error loading analytics:', error);
        return {
            metrics: {
                totalUsers: 0,
                totalOrganizations: 0,
                totalAccounts: 0,
                totalContacts: 0,
                totalLeads: 0,
                totalOpportunities: 0,
                totalTasks: 0,
                totalCases: 0,
                wonOpportunities: 0,
                openOpportunities: 0,
                newAccountsThisMonth: 0,
                newLeadsThisMonth: 0,
                newOpportunitiesThisMonth: 0,
                tasksCompletedThisMonth: 0
            }
        };
    }
}