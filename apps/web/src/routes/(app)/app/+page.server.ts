import type { PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { and, count, desc, eq, gte, not } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
    const userId = locals.user?.id;
    const organizationId = locals.org?.id;
    const db = locals.db

    if (!userId || !organizationId) {
        return {
            error: 'User not authenticated',
            metrics: {
                totalLeads: 0,
                totalOpportunities: 0,
                totalAccounts: 0,
                totalContacts: 0,
                pendingTasks: 0,
                opportunityRevenue: 0
            },
            recentData: {
                leads: [],
                opportunities: [],
                tasks: [],
                activities: []
            }
        }
    }

    try {

        const counts = await db.select({
            totalLeads: count(),
            totalOpportunities: db.$count(schema.opportunity, and(eq(schema.opportunity.organizationId, organizationId), not(eq(schema.opportunity.stage, 'CLOSED_WON')))),
            totalAccounts: db.$count(schema.crmAccount, and(eq(schema.crmAccount.organizationId, organizationId), eq(schema.crmAccount.isActive, true))),
            totalContacts: db.$count(schema.contact, eq(schema.contact.organizationId, organizationId)),
            pendingTasks: db.$count(schema.task, and(eq(schema.task.organizationId, organizationId), not(eq(schema.task.status, 'COMPLETED')), eq(schema.task.ownerId, userId)))
        }).from(schema.lead).where(and(eq(schema.lead.organizationId, organizationId), eq(schema.lead.isConverted, false))).then(res => res[0])

        const [totalLeads, totalOpportunities, totalAccounts, totalContacts, pendingTasks] = [counts.totalLeads, counts.totalOpportunities, counts.totalAccounts, counts.totalContacts, counts.pendingTasks];

        const recentLeads = await db
            .select({ id: schema.lead.id, firstName: schema.lead.firstName, lastName: schema.lead.lastName, company: schema.lead.company, status: schema.lead.status, createdAt: schema.lead.createdAt })
            .from(schema.lead)
            .where(eq(schema.lead.organizationId, organizationId))
            .leftJoin(schema.user, eq(schema.lead.ownerId, schema.user.id))
            .orderBy(desc(schema.lead.createdAt))
            .limit(5);

        const recentOpportunities = await db
            .select({
                id: schema.opportunity.id,
                name: schema.opportunity.name,
                createdAt: schema.opportunity.createdAt,
                accountName: schema.crmAccount.name,
                amount: schema.opportunity.amount
            })
            .from(schema.opportunity)
            .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.opportunity.accountId))
            .where(eq(schema.opportunity.organizationId, organizationId))
            .orderBy(desc(schema.opportunity.createdAt))
            .limit(5);

        const now = new Date();
        const upcomingTasks = await db
            .select({ id: schema.task.id, subject: schema.task.subject, status: schema.task.status, priority: schema.task.priority, dueDate: schema.task.dueDate })
            .from(schema.task)
            .where(and(eq(schema.task.organizationId, organizationId), eq(schema.task.ownerId, userId), not(eq(schema.task.status, 'COMPLETED')), gte(schema.task.dueDate, now)))
            .orderBy(schema.task.dueDate)
            .limit(5);

        const recentActivities = await db
            .select({ id: schema.auditLog.id, timestamp: schema.auditLog.timestamp, action: schema.auditLog.action, description: schema.auditLog.description, userName: schema.user.name, entityType: schema.auditLog.entityType })
            .from(schema.auditLog)
            .leftJoin(schema.user, eq(schema.user.id, schema.auditLog.userId))
            .where(eq(schema.auditLog.organizationId, organizationId))
            .orderBy(desc(schema.auditLog.timestamp))
            .limit(10);

        // Compute opportunity revenue
        const revenueRows = await db
            .select({ amount: schema.opportunity.amount })
            .from(schema.opportunity)
            .where(eq(schema.opportunity.organizationId, organizationId));
        const opportunityRevenue = revenueRows.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

        return {
            metrics: {
                totalLeads,
                totalOpportunities,
                totalAccounts,
                totalContacts,
                pendingTasks,
                opportunityRevenue
            },
            recentData: {
                leads: recentLeads,
                opportunities: recentOpportunities,
                tasks: upcomingTasks,
                activities: recentActivities
            }
        };
    } catch (error) {
        console.error('Dashboard load error:', error);
        return {
            error: 'Failed to load dashboard data',
            metrics: {
                totalLeads: 0,
                totalOpportunities: 0,
                totalAccounts: 0,
                totalContacts: 0,
                pendingTasks: 0,
                opportunityRevenue: 0
            },
            recentData: {
                leads: [],
                opportunities: [],
                tasks: [],
                activities: []
            }
        }
    }
};
