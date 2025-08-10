import express from 'express';
import { verifyToken, requireOrganization } from '../middleware/auth.js';
import { db, schema } from '../lib/db.js';
import { and, desc, eq, gte, not, sql } from 'drizzle-orm';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     DashboardMetrics:
 *       type: object
 *       properties:
 *         totalLeads:
 *           type: integer
 *           description: Number of active leads
 *         totalOpportunities:
 *           type: integer
 *           description: Number of open opportunities
 *         totalAccounts:
 *           type: integer
 *           description: Number of active accounts
 *         totalContacts:
 *           type: integer
 *           description: Number of contacts
 *         pendingTasks:
 *           type: integer
 *           description: Number of pending tasks for the user
 *         opportunityRevenue:
 *           type: number
 *           description: Total pipeline value
 *     DashboardRecentData:
 *       type: object
 *       properties:
 *         leads:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               company:
 *                 type: string
 *               status:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *         opportunities:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *               account:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *         tasks:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               subject:
 *                 type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *         activities:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               action:
 *                 type: string
 *               entityType:
 *                 type: string
 *               description:
 *                 type: string
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               user:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *     DashboardResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         metrics:
 *           $ref: '#/components/schemas/DashboardMetrics'
 *         recentData:
 *           $ref: '#/components/schemas/DashboardRecentData'
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard data with metrics and recent activity
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: X-Organization-ID
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization ID
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardResponse'
 *       400:
 *         description: Missing organization ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied to organization
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyToken, requireOrganization, async (req, res) => {
  try {
    const userId = req.userId;
    const organizationId = req.organizationId;

    // Fetch dashboard metrics - parallel execution for performance
    const [countsRow] = await db
      .select({
        totalLeads: count(),
        totalOpportunities: db.$count(schema.opportunity, and(eq(schema.opportunity.organizationId, organizationId), not(eq(schema.opportunity.stage, 'CLOSED_WON')))),
        totalAccounts: db.$count(schema.crmAccount, and(eq(schema.crmAccount.organizationId, organizationId), eq(schema.crmAccount.isActive, true))),
        totalContacts: db.$count(schema.contact, eq(schema.contact.organizationId, organizationId)),
        pendingTasks: db.$count(schema.task, and(eq(schema.task.organizationId, organizationId), not(eq(schema.task.status, 'Completed')), eq(schema.task.ownerId, userId)))
      }).from(schema.lead).where(and(eq(schema.lead.organizationId, organizationId), eq(schema.lead.isConverted, false)));

    const recentLeads = await db
      .select({ id: schema.lead.id, firstName: schema.lead.firstName, lastName: schema.lead.lastName, company: schema.lead.company, status: schema.lead.status, createdAt: schema.lead.createdAt })
      .from(schema.lead)
      .where(eq(schema.lead.organizationId, organizationId))
      .orderBy(desc(schema.lead.createdAt))
      .limit(5);

    const recentOpportunities = await db
      .select({ id: schema.opportunity.id, name: schema.opportunity.name, amount: schema.opportunity.amount, account: { name: schema.crmAccount.name } })
      .from(schema.opportunity)
      .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.opportunity.accountId))
      .where(eq(schema.opportunity.organizationId, organizationId))
      .orderBy(desc(schema.opportunity.createdAt))
      .limit(5);

    const upcomingTasks = await db
      .select({ id: schema.task.id, subject: schema.task.subject, status: schema.task.status, priority: schema.task.priority, dueDate: schema.task.dueDate })
      .from(schema.task)
      .where(and(eq(schema.task.organizationId, organizationId), eq(schema.task.ownerId, userId), not(eq(schema.task.status, 'Completed')), gte(schema.task.dueDate, new Date())))
      .orderBy(desc(schema.task.dueDate))
      .limit(5);

    const recentActivities = await db
      .select({ id: schema.auditLog.id, action: schema.auditLog.action, entityType: schema.auditLog.entityType, description: schema.auditLog.description, timestamp: schema.auditLog.timestamp, user: { name: schema.user.name } })
      .from(schema.auditLog)
      .leftJoin(schema.user, eq(schema.user.id, schema.auditLog.userId))
      .where(eq(schema.auditLog.organizationId, organizationId))
      .orderBy(desc(schema.auditLog.timestamp))
      .limit(10);

    // Calculate opportunity revenue
    const [{ sumAmount }] = await db
      .select({ sumAmount: sql`sum(${schema.opportunity.amount})` })
      .from(schema.opportunity)
      .where(eq(schema.opportunity.organizationId, organizationId));

    const response = {
      success: true,
      metrics: {
        totalLeads: countsRow.totalLeads,
        totalOpportunities: countsRow.totalOpportunities,
        totalAccounts: countsRow.totalAccounts,
        totalContacts: countsRow.totalContacts,
        pendingTasks: countsRow.pendingTasks,
        opportunityRevenue: Number(sumAmount || 0)
      },
      recentData: {
        leads: recentLeads,
        opportunities: recentOpportunities,
        tasks: upcomingTasks,
        activities: recentActivities
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Dashboard API error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load dashboard data'
    });
  }
});

/**
 * @swagger
 * /dashboard/metrics:
 *   get:
 *     summary: Get dashboard metrics only (lightweight endpoint)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: X-Organization-ID
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization ID
 *     responses:
 *       200:
 *         description: Dashboard metrics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 metrics:
 *                   $ref: '#/components/schemas/DashboardMetrics'
 *       400:
 *         description: Missing organization ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied to organization
 *       500:
 *         description: Internal server error
 */
router.get('/metrics', verifyToken, requireOrganization, async (req, res) => {
  try {
    const userId = req.userId;
    const organizationId = req.organizationId;

    // Fetch only metrics for lightweight response
    const [countsRow2] = await db
      .select({
        totalLeads: db.$count(schema.lead, and(eq(schema.lead.organizationId, organizationId), eq(schema.lead.isConverted, false))),
        totalOpportunities: db.$count(schema.opportunity, and(eq(schema.opportunity.organizationId, organizationId), not(eq(schema.opportunity.stage, 'CLOSED_WON')))),
        totalAccounts: db.$count(schema.crmAccount, and(eq(schema.crmAccount.organizationId, organizationId), eq(schema.crmAccount.isActive, true))),
        totalContacts: db.$count(schema.contact, eq(schema.contact.organizationId, organizationId)),
        pendingTasks: db.$count(schema.task, and(eq(schema.task.organizationId, organizationId), not(eq(schema.task.status, 'Completed')), eq(schema.task.ownerId, userId)))
      });

    const [{ sumAmount: sumAmount2 }] = await db
      .select({ sumAmount: sql`sum(${schema.opportunity.amount})` })
      .from(schema.opportunity)
      .where(eq(schema.opportunity.organizationId, organizationId));

    const response = {
      success: true,
      metrics: {
        totalLeads: countsRow2.totalLeads,
        totalOpportunities: countsRow2.totalOpportunities,
        totalAccounts: countsRow2.totalAccounts,
        totalContacts: countsRow2.totalContacts,
        pendingTasks: countsRow2.pendingTasks,
        opportunityRevenue: Number(sumAmount2 || 0)
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Dashboard metrics API error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load dashboard metrics'
    });
  }
});

export default router;