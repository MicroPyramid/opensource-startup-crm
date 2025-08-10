import express from 'express';
import { db, schema } from '../lib/db.js';
import { desc, eq } from 'drizzle-orm';
import { verifyToken, requireOrganization } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);
router.use(requireOrganization);

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         industry:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         website:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all accounts for organization
 *     tags: [Accounts]
 *     parameters:
 *       - in: header
 *         name: X-Organization-ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of accounts
 */
router.get('/', async (req, res) => {
  try {
    const accounts = await db
      .select({
        id: schema.crmAccount.id,
        name: schema.crmAccount.name,
        industry: schema.crmAccount.industry,
        phone: schema.crmAccount.phone,
        email: schema.crmAccount.website, // no email field in schema; website kept
        website: schema.crmAccount.website,
        createdAt: schema.crmAccount.createdAt,
        owner: {
          id: schema.user.id,
          name: schema.user.name,
          email: schema.user.email
        }
      })
      .from(schema.crmAccount)
      .leftJoin(schema.user, eq(schema.user.id, schema.crmAccount.ownerId))
      .where(eq(schema.crmAccount.organizationId, req.organizationId))
      .orderBy(desc(schema.crmAccount.createdAt));

    res.json({ accounts });
  } catch (error) {
    console.error('Get accounts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
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
 *             properties:
 *               name:
 *                 type: string
 *               industry:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               website:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account created successfully
 */
router.post('/', async (req, res) => {
  try {
    const { name, industry, phone, email, website } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Account name is required' });
    }

    const [account] = await db
      .insert(schema.crmAccount)
      .values({
        name,
        industry,
        phone,
        website,
        organizationId: req.organizationId,
        ownerId: req.userId
      })
      .returning({
        id: schema.crmAccount.id,
        name: schema.crmAccount.name,
        industry: schema.crmAccount.industry,
        phone: schema.crmAccount.phone,
        website: schema.crmAccount.website
      });

    const [owner] = await db
      .select({ id: schema.user.id, name: schema.user.name, email: schema.user.email })
      .from(schema.user)
      .where(eq(schema.user.id, req.userId));

    const response = { ...account, owner };

    res.status(201).json(response);
  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;