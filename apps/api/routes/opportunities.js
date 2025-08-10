import express from 'express';
import { verifyToken, requireOrganization } from '../middleware/auth.js';
import { db, schema } from '../lib/db.js';
import { and, desc, eq } from 'drizzle-orm';

const router = express.Router();

router.use(verifyToken);
router.use(requireOrganization);

/**
 * @swagger
 * /opportunities:
 *   get:
 *     summary: Get all opportunities for organization
 *     tags: [Opportunities]
 *     parameters:
 *       - in: header
 *         name: X-Organization-ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of opportunities
 */
router.get('/', async (req, res) => {
  try {
    const rows = await db
      .select({
        id: schema.opportunity.id,
        name: schema.opportunity.name,
        amount: schema.opportunity.amount,
        stage: schema.opportunity.stage,
        closeDate: schema.opportunity.closeDate,
        createdAt: schema.opportunity.createdAt,
        accountId: schema.crmAccount.id,
        accountName: schema.crmAccount.name,
        ownerId: schema.user.id,
        ownerName: schema.user.name,
        ownerEmail: schema.user.email
      })
      .from(schema.opportunity)
      .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.opportunity.accountId))
      .leftJoin(schema.user, eq(schema.user.id, schema.opportunity.ownerId))
      .where(eq(schema.opportunity.organizationId, req.organizationId))
      .orderBy(desc(schema.opportunity.createdAt));

    res.json({
      opportunities: rows.map((r) => ({
        id: r.id,
        name: r.name,
        amount: r.amount,
        stage: r.stage,
        closeDate: r.closeDate,
        createdAt: r.createdAt,
        account: r.accountId ? { id: r.accountId, name: r.accountName } : null,
        owner: r.ownerId ? { id: r.ownerId, name: r.ownerName, email: r.ownerEmail } : null
      }))
    });
  } catch (error) {
    console.error('Get opportunities error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /opportunities:
 *   post:
 *     summary: Create a new opportunity
 *     tags: [Opportunities]
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
 *               - name
 *               - amount
 *               - closeDate
 *               - stage
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *               closeDate:
 *                 type: string
 *                 format: date
 *               stage:
 *                 type: string
 *               accountId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Opportunity created successfully
 */
router.post('/', async (req, res) => {
  try {
    const { name, amount, closeDate, stage, accountId } = req.body;

    if (!name || !amount || !closeDate || !stage) {
      return res.status(400).json({ error: 'Name, amount, close date, and stage are required' });
    }

    if (accountId) {
      const [account] = await db
        .select({ id: schema.crmAccount.id })
        .from(schema.crmAccount)
        .where(and(eq(schema.crmAccount.id, accountId), eq(schema.crmAccount.organizationId, req.organizationId)))
        .limit(1);
      if (!account) return res.status(400).json({ error: 'Account not found in your organization' });
    }

    const [inserted] = await db
      .insert(schema.opportunity)
      .values({
        name,
        amount: parseFloat(amount),
        closeDate: new Date(closeDate),
        stage,
        accountId: accountId || null,
        organizationId: req.organizationId,
        ownerId: req.userId
      })
      .returning({ id: schema.opportunity.id });

    const [row] = await db
      .select({
        id: schema.opportunity.id,
        name: schema.opportunity.name,
        amount: schema.opportunity.amount,
        stage: schema.opportunity.stage,
        closeDate: schema.opportunity.closeDate,
        createdAt: schema.opportunity.createdAt,
        accountId: schema.crmAccount.id,
        accountName: schema.crmAccount.name,
        ownerId: schema.user.id,
        ownerName: schema.user.name,
        ownerEmail: schema.user.email
      })
      .from(schema.opportunity)
      .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.opportunity.accountId))
      .leftJoin(schema.user, eq(schema.user.id, schema.opportunity.ownerId))
      .where(eq(schema.opportunity.id, inserted.id))
      .limit(1);

    res.status(201).json({
      id: row.id,
      name: row.name,
      amount: row.amount,
      stage: row.stage,
      closeDate: row.closeDate,
      createdAt: row.createdAt,
      account: row.accountId ? { id: row.accountId, name: row.accountName } : null,
      owner: row.ownerId ? { id: row.ownerId, name: row.ownerName, email: row.ownerEmail } : null
    });
  } catch (error) {
    console.error('Create opportunity error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;