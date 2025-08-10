import express from 'express';
import { verifyToken, requireOrganization } from '../middleware/auth.js';
import { db, schema } from '../lib/db.js';
import { and, desc, eq, ilike, not, sql } from 'drizzle-orm';

const router = express.Router();

router.use(verifyToken);
router.use(requireOrganization);

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         subject:
 *           type: string
 *         status:
 *           type: string
 *           enum: [Not Started, In Progress, Completed, Deferred, Waiting]
 *         priority:
 *           type: string
 *           enum: [High, Normal, Low]
 *         dueDate:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for organization
 *     tags: [Tasks]
 *     parameters:
 *       - in: header
 *         name: X-Organization-ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter tasks by status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         description: Filter tasks by priority
 *       - in: query
 *         name: ownerId
 *         schema:
 *           type: string
 *         description: Filter tasks by owner ID
 *       - in: query
 *         name: accountId
 *         schema:
 *           type: string
 *         description: Filter tasks by account ID
 *       - in: query
 *         name: contactId
 *         schema:
 *           type: string
 *         description: Filter tasks by contact ID
 *       - in: query
 *         name: leadId
 *         schema:
 *           type: string
 *         description: Filter tasks by lead ID
 *       - in: query
 *         name: opportunityId
 *         schema:
 *           type: string
 *         description: Filter tasks by opportunity ID
 *       - in: query
 *         name: caseId
 *         schema:
 *           type: string
 *         description: Filter tasks by case ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Limit number of results
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Offset for pagination
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/', async (req, res) => {
  try {
    const {
      status,
      priority,
      ownerId,
      accountId,
      contactId,
      leadId,
      opportunityId,
      caseId,
      limit = 50,
      offset = 0
    } = req.query;

    // Build where clause for filtering
    const where = {
      organizationId: req.organizationId,
      ...(status && { status }),
      ...(priority && { priority }),
      ...(ownerId && { ownerId }),
      ...(accountId && { accountId }),
      ...(contactId && { contactId }),
      ...(leadId && { leadId }),
      ...(opportunityId && { opportunityId }),
      ...(caseId && { caseId })
    };

    // Build conditions for Drizzle
    const conditions = [eq(schema.task.organizationId, req.organizationId)];
    if (status) conditions.push(eq(schema.task.status, status));
    if (priority) conditions.push(eq(schema.task.priority, priority));
    if (ownerId) conditions.push(eq(schema.task.ownerId, ownerId));
    if (accountId) conditions.push(eq(schema.task.accountId, accountId));
    if (contactId) conditions.push(eq(schema.task.contactId, contactId));
    if (leadId) conditions.push(eq(schema.task.leadId, leadId));
    if (opportunityId) conditions.push(eq(schema.task.opportunityId, opportunityId));
    if (caseId) conditions.push(eq(schema.task.caseId, caseId));

    const rows = await db
      .select({
        id: schema.task.id,
        subject: schema.task.subject,
        status: schema.task.status,
        priority: schema.task.priority,
        dueDate: schema.task.dueDate,
        createdAt: schema.task.createdAt,
        ownerId: schema.user.id,
        ownerName: schema.user.name,
        ownerEmail: schema.user.email,
        createdById: schema.user.id,
        createdByName: schema.user.name,
        createdByEmail: schema.user.email,
        accountId: schema.crmAccount.id,
        accountName: schema.crmAccount.name,
        accountType: schema.crmAccount.type,
        contactId: schema.contact.id,
        contactFirstName: schema.contact.firstName,
        contactLastName: schema.contact.lastName,
        contactEmail: schema.contact.email,
        leadId: schema.lead.id,
        leadFirstName: schema.lead.firstName,
        leadLastName: schema.lead.lastName,
        leadEmail: schema.lead.email,
        leadCompany: schema.lead.company,
        opportunityId: schema.opportunity.id,
        opportunityName: schema.opportunity.name,
        opportunityAmount: schema.opportunity.amount,
        caseId: schema.caseTable.id,
        caseNumber: schema.caseTable.caseNumber,
        caseSubject: schema.caseTable.subject,
        caseStatus: schema.caseTable.status
      })
      .from(schema.task)
      .leftJoin(schema.user, eq(schema.user.id, schema.task.ownerId))
      .leftJoin(schema.user.as('creator'), eq(schema.user.as('creator').id, schema.task.createdById))
      .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.task.accountId))
      .leftJoin(schema.contact, eq(schema.contact.id, schema.task.contactId))
      .leftJoin(schema.lead, eq(schema.lead.id, schema.task.leadId))
      .leftJoin(schema.opportunity, eq(schema.opportunity.id, schema.task.opportunityId))
      .leftJoin(schema.caseTable, eq(schema.caseTable.id, schema.task.caseId))
      .where(and(...conditions))
      .orderBy(desc(schema.task.createdAt))
      .limit(parseInt(limit))
      .offset(parseInt(offset));

    const [{ count: totalCount }] = await db
      .select({ count: sql`count(*)`.as('count') })
      .from(schema.task)
      .where(and(...conditions));

    const tasks = rows.map((r) => ({
      id: r.id,
      subject: r.subject,
      status: r.status,
      priority: r.priority,
      dueDate: r.dueDate,
      createdAt: r.createdAt,
      owner: r.ownerId ? { id: r.ownerId, name: r.ownerName, email: r.ownerEmail } : null,
      createdBy: r.createdById ? { id: r.createdById, name: r.createdByName, email: r.createdByEmail } : null,
      account: r.accountId ? { id: r.accountId, name: r.accountName, type: r.accountType } : null,
      contact: r.contactId ? { id: r.contactId, firstName: r.contactFirstName, lastName: r.contactLastName, email: r.contactEmail } : null,
      lead: r.leadId ? { id: r.leadId, firstName: r.leadFirstName, lastName: r.leadLastName, email: r.leadEmail, company: r.leadCompany } : null,
      opportunity: r.opportunityId ? { id: r.opportunityId, name: r.opportunityName, amount: r.opportunityAmount, status: r.status } : null,
      case: r.caseId ? { id: r.caseId, caseNumber: r.caseNumber, subject: r.caseSubject, status: r.caseStatus } : null
    }));

    res.json({
      tasks,
      pagination: {
        total: Number(totalCount || 0),
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + parseInt(limit) < Number(totalCount || 0)
      }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     parameters:
 *       - in: header
 *         name: X-Organization-ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *             properties:
 *               subject:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Not Started, In Progress, Completed, Deferred, Waiting]
 *                 default: Not Started
 *               priority:
 *                 type: string
 *                 enum: [High, Normal, Low]
 *                 default: Normal
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *               ownerId:
 *                 type: string
 *                 description: UUID of the user who owns this task
 *               accountId:
 *                 type: string
 *                 description: UUID of the related account
 *               contactId:
 *                 type: string
 *                 description: UUID of the related contact
 *               leadId:
 *                 type: string
 *                 description: UUID of the related lead
 *               opportunityId:
 *                 type: string
 *                 description: UUID of the related opportunity
 *               caseId:
 *                 type: string
 *                 description: UUID of the related case
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', async (req, res) => {
  try {
    const {
      subject,
      status = 'Not Started',
      priority = 'Normal',
      dueDate,
      description,
      ownerId,
      accountId,
      contactId,
      leadId,
      opportunityId,
      caseId
    } = req.body;

    if (!subject) {
      return res.status(400).json({ error: 'Subject is required' });
    }

    // Validate status
    const validStatuses = ['Not Started', 'In Progress', 'Completed', 'Deferred', 'Waiting'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Valid options: ' + validStatuses.join(', ') });
    }

    // Validate priority
    const validPriorities = ['High', 'Normal', 'Low'];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority. Valid options: ' + validPriorities.join(', ') });
    }

    // Validate owner exists in organization
    let owner = null;
    const finalOwnerId = ownerId || req.userId; // Default to current user if no owner specified

    const [member] = await db
      .select({ id: schema.member.id })
      .from(schema.member)
      .where(and(eq(schema.member.userId, finalOwnerId), eq(schema.member.organizationId, req.organizationId)))
      .limit(1);

    if (!member) {
      return res.status(400).json({ error: 'Owner must be a member of this organization' });
    }

    // Validate related entities if provided
    if (accountId) {
      const [account] = await db
        .select({ id: schema.crmAccount.id })
        .from(schema.crmAccount)
        .where(and(eq(schema.crmAccount.id, accountId), eq(schema.crmAccount.organizationId, req.organizationId)))
        .limit(1);
      if (!account) {
        return res.status(400).json({ error: 'Account not found in your organization' });
      }
    }

    if (contactId) {
      const [contact] = await db
        .select({ id: schema.contact.id })
        .from(schema.contact)
        .where(and(eq(schema.contact.id, contactId), eq(schema.contact.organizationId, req.organizationId)))
        .limit(1);
      if (!contact) {
        return res.status(400).json({ error: 'Contact not found in your organization' });
      }
    }

    if (leadId) {
      const [lead] = await db
        .select({ id: schema.lead.id })
        .from(schema.lead)
        .where(and(eq(schema.lead.id, leadId), eq(schema.lead.organizationId, req.organizationId)))
        .limit(1);
      if (!lead) {
        return res.status(400).json({ error: 'Lead not found in your organization' });
      }
    }

    if (opportunityId) {
      const [opp] = await db
        .select({ id: schema.opportunity.id })
        .from(schema.opportunity)
        .where(and(eq(schema.opportunity.id, opportunityId), eq(schema.opportunity.organizationId, req.organizationId)))
        .limit(1);
      const opportunity = opp;
      if (!opportunity) {
        return res.status(400).json({ error: 'Opportunity not found in your organization' });
      }
    }

    if (caseId) {
      const [caseRecord] = await db
        .select({ id: schema.caseTable.id })
        .from(schema.caseTable)
        .where(and(eq(schema.caseTable.id, caseId), eq(schema.caseTable.organizationId, req.organizationId)))
        .limit(1);
      if (!caseRecord) {
        return res.status(400).json({ error: 'Case not found in your organization' });
      }
    }

    // Create the task
    const [inserted] = await db
      .insert(schema.task)
      .values({
        subject,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        description: description || null,
        ownerId: finalOwnerId,
        createdById: req.userId,
        organizationId: req.organizationId,
        accountId: accountId || null,
        contactId: contactId || null,
        leadId: leadId || null,
        opportunityId: opportunityId || null,
        caseId: caseId || null
      })
      .returning({ id: schema.task.id });

    const [row] = await db
      .select({
        id: schema.task.id,
        subject: schema.task.subject,
        status: schema.task.status,
        priority: schema.task.priority,
        dueDate: schema.task.dueDate,
        createdAt: schema.task.createdAt,
        ownerId: schema.user.id,
        ownerName: schema.user.name,
        ownerEmail: schema.user.email,
        createdById: schema.user.id,
        createdByName: schema.user.name,
        createdByEmail: schema.user.email,
        accountId: schema.crmAccount.id,
        accountName: schema.crmAccount.name,
        accountType: schema.crmAccount.type,
        contactId: schema.contact.id,
        contactFirstName: schema.contact.firstName,
        contactLastName: schema.contact.lastName,
        contactEmail: schema.contact.email,
        leadId: schema.lead.id,
        leadFirstName: schema.lead.firstName,
        leadLastName: schema.lead.lastName,
        leadEmail: schema.lead.email,
        leadCompany: schema.lead.company,
        opportunityId: schema.opportunity.id,
        opportunityName: schema.opportunity.name,
        opportunityAmount: schema.opportunity.amount,
        caseId: schema.caseTable.id,
        caseNumber: schema.caseTable.caseNumber,
        caseSubject: schema.caseTable.subject,
        caseStatus: schema.caseTable.status
      })
      .from(schema.task)
      .leftJoin(schema.user, eq(schema.user.id, schema.task.ownerId))
      .leftJoin(schema.user.as('creator'), eq(schema.user.as('creator').id, schema.task.createdById))
      .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.task.accountId))
      .leftJoin(schema.contact, eq(schema.contact.id, schema.task.contactId))
      .leftJoin(schema.lead, eq(schema.lead.id, schema.task.leadId))
      .leftJoin(schema.opportunity, eq(schema.opportunity.id, schema.task.opportunityId))
      .leftJoin(schema.caseTable, eq(schema.caseTable.id, schema.task.caseId))
      .where(eq(schema.task.id, inserted.id))
      .limit(1);

    res.status(201).json({
      id: row.id,
      subject: row.subject,
      status: row.status,
      priority: row.priority,
      dueDate: row.dueDate,
      createdAt: row.createdAt,
      owner: row.ownerId ? { id: row.ownerId, name: row.ownerName, email: row.ownerEmail } : null,
      createdBy: row.createdById ? { id: row.createdById, name: row.createdByName, email: row.createdByEmail } : null,
      account: row.accountId ? { id: row.accountId, name: row.accountName, type: row.accountType } : null,
      contact: row.contactId ? { id: row.contactId, firstName: row.contactFirstName, lastName: row.contactLastName, email: row.contactEmail } : null,
      lead: row.leadId ? { id: row.leadId, firstName: row.leadFirstName, lastName: row.leadLastName, email: row.leadEmail, company: row.leadCompany } : null,
      opportunity: row.opportunityId ? { id: row.opportunityId, name: row.opportunityName, amount: row.opportunityAmount, status: row.status } : null,
      case: row.caseId ? { id: row.caseId, caseNumber: row.caseNumber, subject: row.caseSubject, status: row.caseStatus } : null
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a specific task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: header
 *         name: X-Organization-ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const rows = await db
      .select({
        id: schema.task.id,
        subject: schema.task.subject,
        status: schema.task.status,
        priority: schema.task.priority,
        dueDate: schema.task.dueDate,
        description: schema.task.description,
        createdAt: schema.task.createdAt,
        ownerId: schema.user.id,
        ownerName: schema.user.name,
        ownerEmail: schema.user.email,
        createdById: schema.user.id,
        createdByName: schema.user.name,
        createdByEmail: schema.user.email,
        accountId: schema.crmAccount.id,
        accountName: schema.crmAccount.name,
        accountType: schema.crmAccount.type,
        accountWebsite: schema.crmAccount.website,
        accountPhone: schema.crmAccount.phone,
        contactId: schema.contact.id,
        contactFirstName: schema.contact.firstName,
        contactLastName: schema.contact.lastName,
        contactEmail: schema.contact.email,
        contactPhone: schema.contact.phone,
        contactTitle: schema.contact.title,
        leadId: schema.lead.id,
        leadFirstName: schema.lead.firstName,
        leadLastName: schema.lead.lastName,
        leadEmail: schema.lead.email,
        leadPhone: schema.lead.phone,
        leadCompany: schema.lead.company,
        leadStatus: schema.lead.status,
        opportunityId: schema.opportunity.id,
        opportunityName: schema.opportunity.name,
        opportunityAmount: schema.opportunity.amount,
        opportunityStatus: schema.opportunity.stage,
        opportunityStage: schema.opportunity.stage,
        opportunityCloseDate: schema.opportunity.closeDate,
        caseId: schema.caseTable.id,
        caseNumber: schema.caseTable.caseNumber,
        caseSubject: schema.caseTable.subject,
        caseStatus: schema.caseTable.status,
        casePriority: schema.caseTable.priority,
        orgId: schema.organization.id,
        orgName: schema.organization.name
      })
      .from(schema.task)
      .leftJoin(schema.user, eq(schema.user.id, schema.task.ownerId))
      .leftJoin(schema.user.as('creator'), eq(schema.user.as('creator').id, schema.task.createdById))
      .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.task.accountId))
      .leftJoin(schema.contact, eq(schema.contact.id, schema.task.contactId))
      .leftJoin(schema.lead, eq(schema.lead.id, schema.task.leadId))
      .leftJoin(schema.opportunity, eq(schema.opportunity.id, schema.task.opportunityId))
      .leftJoin(schema.caseTable, eq(schema.caseTable.id, schema.task.caseId))
      .leftJoin(schema.organization, eq(schema.organization.id, schema.task.organizationId))
      .where(and(eq(schema.task.id, id), eq(schema.task.organizationId, req.organizationId)))
      .limit(1);

    if (!rows.length) return res.status(404).json({ error: 'Task not found' });

    const [base] = rows;

    // Load comments separately with author; joining all can be heavy
    const comments = await db
      .select({
        id: schema.comment.id,
        body: schema.comment.body,
        isPrivate: schema.comment.isPrivate,
        createdAt: schema.comment.createdAt,
        authorId: schema.user.id,
        authorName: schema.user.name,
        authorEmail: schema.user.email
      })
      .from(schema.comment)
      .leftJoin(schema.user, eq(schema.user.id, schema.comment.authorId))
      .where(eq(schema.comment.taskId, id))
      .orderBy(desc(schema.comment.createdAt));

    res.json({
      id: base.id,
      subject: base.subject,
      status: base.status,
      priority: base.priority,
      dueDate: base.dueDate,
      description: base.description,
      createdAt: base.createdAt,
      owner: base.ownerId ? { id: base.ownerId, name: base.ownerName, email: base.ownerEmail } : null,
      createdBy: base.createdById ? { id: base.createdById, name: base.createdByName, email: base.createdByEmail } : null,
      account: base.accountId ? { id: base.accountId, name: base.accountName, type: base.accountType, website: base.accountWebsite, phone: base.accountPhone } : null,
      contact: base.contactId ? { id: base.contactId, firstName: base.contactFirstName, lastName: base.contactLastName, email: base.contactEmail, phone: base.contactPhone, title: base.contactTitle } : null,
      lead: base.leadId ? { id: base.leadId, firstName: base.leadFirstName, lastName: base.leadLastName, email: base.leadEmail, phone: base.leadPhone, company: base.leadCompany, status: base.leadStatus } : null,
      opportunity: base.opportunityId ? { id: base.opportunityId, name: base.opportunityName, amount: base.opportunityAmount, status: base.opportunityStatus, stage: base.opportunityStage, closeDate: base.opportunityCloseDate } : null,
      case: base.caseId ? { id: base.caseId, caseNumber: base.caseNumber, subject: base.caseSubject, status: base.caseStatus, priority: base.casePriority } : null,
      organization: base.orgId ? { id: base.orgId, name: base.orgName } : null,
      comments: comments.map((c) => ({ id: c.id, body: c.body, isPrivate: c.isPrivate, createdAt: c.createdAt, author: c.authorId ? { id: c.authorId, name: c.authorName, email: c.authorEmail } : null }))
    });
  } catch (error) {
    console.error('Get task details error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a specific task
 *     tags: [Tasks]
 *     parameters:
 *       - in: header
 *         name: X-Organization-ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Not Started, In Progress, Completed, Deferred, Waiting]
 *               priority:
 *                 type: string
 *                 enum: [High, Normal, Low]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *               ownerId:
 *                 type: string
 *                 description: UUID of the user who owns this task
 *               accountId:
 *                 type: string
 *                 description: UUID of the related account
 *               contactId:
 *                 type: string
 *                 description: UUID of the related contact
 *               leadId:
 *                 type: string
 *                 description: UUID of the related lead
 *               opportunityId:
 *                 type: string
 *                 description: UUID of the related opportunity
 *               caseId:
 *                 type: string
 *                 description: UUID of the related case
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Task not found
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      subject,
      status,
      priority,
      dueDate,
      description,
      ownerId,
      accountId,
      contactId,
      leadId,
      opportunityId,
      caseId
    } = req.body;

    // Check if task exists and belongs to organization
    const [existingTask] = await db
      .select({ id: schema.task.id })
      .from(schema.task)
      .where(and(eq(schema.task.id, id), eq(schema.task.organizationId, req.organizationId)))
      .limit(1);

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Validate status if provided
    if (status) {
      const validStatuses = ['Not Started', 'In Progress', 'Completed', 'Deferred', 'Waiting'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status. Valid options: ' + validStatuses.join(', ') });
      }
    }

    // Validate priority if provided
    if (priority) {
      const validPriorities = ['High', 'Normal', 'Low'];
      if (!validPriorities.includes(priority)) {
        return res.status(400).json({ error: 'Invalid priority. Valid options: ' + validPriorities.join(', ') });
      }
    }

    // Validate owner exists in organization if provided
    if (ownerId) {
      const [member] = await db
        .select({ id: schema.member.id })
        .from(schema.member)
        .where(and(eq(schema.member.userId, ownerId), eq(schema.member.organizationId, req.organizationId)))
        .limit(1);

      if (!member) {
        return res.status(400).json({ error: 'Owner must be a member of this organization' });
      }
    }

    // Validate related entities if provided
    if (accountId !== undefined) {
      if (accountId) {
        const [account] = await db
          .select({ id: schema.crmAccount.id })
          .from(schema.crmAccount)
          .where(and(eq(schema.crmAccount.id, accountId), eq(schema.crmAccount.organizationId, req.organizationId)))
          .limit(1);
        if (!account) {
          return res.status(400).json({ error: 'Account not found in your organization' });
        }
      }
    }

    if (contactId !== undefined) {
      if (contactId) {
        const [contact] = await db
          .select({ id: schema.contact.id })
          .from(schema.contact)
          .where(and(eq(schema.contact.id, contactId), eq(schema.contact.organizationId, req.organizationId)))
          .limit(1);
        if (!contact) {
          return res.status(400).json({ error: 'Contact not found in your organization' });
        }
      }
    }

    if (leadId !== undefined) {
      if (leadId) {
        const [lead] = await db
          .select({ id: schema.lead.id })
          .from(schema.lead)
          .where(and(eq(schema.lead.id, leadId), eq(schema.lead.organizationId, req.organizationId)))
          .limit(1);
        if (!lead) {
          return res.status(400).json({ error: 'Lead not found in your organization' });
        }
      }
    }

    if (opportunityId !== undefined) {
      if (opportunityId) {
        const [opp] = await db
          .select({ id: schema.opportunity.id })
          .from(schema.opportunity)
          .where(and(eq(schema.opportunity.id, opportunityId), eq(schema.opportunity.organizationId, req.organizationId)))
          .limit(1);
        const opportunity = opp;
        if (!opportunity) {
          return res.status(400).json({ error: 'Opportunity not found in your organization' });
        }
      }
    }

    if (caseId !== undefined) {
      if (caseId) {
        const [caseRecord] = await db
          .select({ id: schema.caseTable.id })
          .from(schema.caseTable)
          .where(and(eq(schema.caseTable.id, caseId), eq(schema.caseTable.organizationId, req.organizationId)))
          .limit(1);
        if (!caseRecord) {
          return res.status(400).json({ error: 'Case not found in your organization' });
        }
      }
    }

    // Build update data object
    const updateData = {};
    if (subject !== undefined) updateData.subject = subject;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (description !== undefined) updateData.description = description;
    if (ownerId !== undefined) updateData.ownerId = ownerId;
    if (accountId !== undefined) updateData.accountId = accountId;
    if (contactId !== undefined) updateData.contactId = contactId;
    if (leadId !== undefined) updateData.leadId = leadId;
    if (opportunityId !== undefined) updateData.opportunityId = opportunityId;
    if (caseId !== undefined) updateData.caseId = caseId;

    // Update the task
    const [updated] = await db
      .update(schema.task)
      .set(updateData)
      .where(eq(schema.task.id, id))
      .returning({ id: schema.task.id });

    const [row2] = await db
      .select({
        id: schema.task.id,
        subject: schema.task.subject,
        status: schema.task.status,
        priority: schema.task.priority,
        dueDate: schema.task.dueDate,
        createdAt: schema.task.createdAt,
        ownerId: schema.user.id,
        ownerName: schema.user.name,
        ownerEmail: schema.user.email,
        createdById: schema.user.id,
        createdByName: schema.user.name,
        createdByEmail: schema.user.email,
        accountId: schema.crmAccount.id,
        accountName: schema.crmAccount.name,
        accountType: schema.crmAccount.type,
        contactId: schema.contact.id,
        contactFirstName: schema.contact.firstName,
        contactLastName: schema.contact.lastName,
        contactEmail: schema.contact.email,
        leadId: schema.lead.id,
        leadFirstName: schema.lead.firstName,
        leadLastName: schema.lead.lastName,
        leadEmail: schema.lead.email,
        leadCompany: schema.lead.company,
        opportunityId: schema.opportunity.id,
        opportunityName: schema.opportunity.name,
        opportunityAmount: schema.opportunity.amount,
        caseId: schema.caseTable.id,
        caseNumber: schema.caseTable.caseNumber,
        caseSubject: schema.caseTable.subject,
        caseStatus: schema.caseTable.status
      })
      .from(schema.task)
      .leftJoin(schema.user, eq(schema.user.id, schema.task.ownerId))
      .leftJoin(schema.user.as('creator'), eq(schema.user.as('creator').id, schema.task.createdById))
      .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.task.accountId))
      .leftJoin(schema.contact, eq(schema.contact.id, schema.task.contactId))
      .leftJoin(schema.lead, eq(schema.lead.id, schema.task.leadId))
      .leftJoin(schema.opportunity, eq(schema.opportunity.id, schema.task.opportunityId))
      .leftJoin(schema.caseTable, eq(schema.caseTable.id, schema.task.caseId))
      .where(eq(schema.task.id, updated.id))
      .limit(1);

    res.json({
      id: row2.id,
      subject: row2.subject,
      status: row2.status,
      priority: row2.priority,
      dueDate: row2.dueDate,
      createdAt: row2.createdAt,
      owner: row2.ownerId ? { id: row2.ownerId, name: row2.ownerName, email: row2.ownerEmail } : null,
      createdBy: row2.createdById ? { id: row2.createdById, name: row2.createdByName, email: row2.createdByEmail } : null,
      account: row2.accountId ? { id: row2.accountId, name: row2.accountName, type: row2.accountType } : null,
      contact: row2.contactId ? { id: row2.contactId, firstName: row2.contactFirstName, lastName: row2.contactLastName, email: row2.contactEmail } : null,
      lead: row2.leadId ? { id: row2.leadId, firstName: row2.leadFirstName, lastName: row2.leadLastName, email: row2.leadEmail, company: row2.leadCompany } : null,
      opportunity: row2.opportunityId ? { id: row2.opportunityId, name: row2.opportunityName, amount: row2.opportunityAmount, status: row2.status } : null,
      case: row2.caseId ? { id: row2.caseId, caseNumber: row2.caseNumber, subject: row2.caseSubject, status: row2.caseStatus } : null
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a specific task
 *     tags: [Tasks]
 *     parameters:
 *       - in: header
 *         name: X-Organization-ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if task exists and belongs to organization
    const [existingTask] = await db
      .select({ id: schema.task.id })
      .from(schema.task)
      .where(and(eq(schema.task.id, id), eq(schema.task.organizationId, req.organizationId)))
      .limit(1);

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Delete the task (this will also cascade delete related comments due to schema relationship)
    await db.delete(schema.task).where(eq(schema.task.id, id));

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /tasks/{id}/comments:
 *   post:
 *     summary: Add a comment to a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: header
 *         name: X-Organization-ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - body
 *             properties:
 *               body:
 *                 type: string
 *               isPrivate:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       404:
 *         description: Task not found
 */
router.post('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { body, isPrivate = false } = req.body;

    if (!body) {
      return res.status(400).json({ error: 'Comment body is required' });
    }

    // Check if task exists and belongs to organization
    const [existingTask] = await db
      .select({ id: schema.task.id })
      .from(schema.task)
      .where(and(eq(schema.task.id, id), eq(schema.task.organizationId, req.organizationId)))
      .limit(1);

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Create the comment
    const [inserted] = await db
      .insert(schema.comment)
      .values({
        body,
        isPrivate,
        authorId: req.userId,
        organizationId: req.organizationId,
        taskId: id
      })
      .returning({ id: schema.comment.id });

    const [comment] = await db
      .select({
        id: schema.comment.id,
        body: schema.comment.body,
        isPrivate: schema.comment.isPrivate,
        createdAt: schema.comment.createdAt,
        authorId: schema.user.id,
        authorName: schema.user.name,
        authorEmail: schema.user.email
      })
      .from(schema.comment)
      .leftJoin(schema.user, eq(schema.user.id, schema.comment.authorId))
      .where(eq(schema.comment.id, inserted.id))
      .limit(1);

    res.status(201).json({
      id: comment.id,
      body: comment.body,
      isPrivate: comment.isPrivate,
      createdAt: comment.createdAt,
      author: comment.authorId ? { id: comment.authorId, name: comment.authorName, email: comment.authorEmail } : null
    });
  } catch (error) {
    console.error('Add task comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
