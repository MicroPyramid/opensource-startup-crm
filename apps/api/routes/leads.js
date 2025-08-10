import express from 'express';
import { verifyToken, requireOrganization } from '../middleware/auth.js';
import { db, schema } from '../lib/db.js';
import { and, desc, eq, ilike, not, sql } from 'drizzle-orm';

const router = express.Router();

router.use(verifyToken);
router.use(requireOrganization);

/**
 * @swagger
 * /leads/metadata:
 *   get:
 *     summary: Get leads metadata (enums, options, etc.)
 *     tags: [Leads]
 *     responses:
 *       200:
 *         description: Leads metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 leadStatuses:
 *                   type: array
 *                   items:
 *                     type: string
 *                 leadSources:
 *                   type: array
 *                   items:
 *                     type: string
 *                 ratings:
 *                   type: array
 *                   items:
 *                     type: string
 *                 industries:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/metadata', async (req, res) => {
  try {
    const metadata = {
      leadStatuses: [
        'NEW',
        'PENDING',
        'CONTACTED',
        'QUALIFIED',
        'UNQUALIFIED',
        'CONVERTED'
      ],
      leadSources: [
        'WEB',
        'PHONE_INQUIRY',
        'PARTNER_REFERRAL',
        'COLD_CALL',
        'TRADE_SHOW',
        'EMPLOYEE_REFERRAL',
        'ADVERTISEMENT',
        'OTHER'
      ],
      ratings: [
        'Hot',
        'Warm',
        'Cold'
      ],
      industries: [
        'Technology',
        'Healthcare',
        'Finance',
        'Education',
        'Manufacturing',
        'Retail',
        'Real Estate',
        'Consulting',
        'Media',
        'Transportation',
        'Energy',
        'Government',
        'Non-profit',
        'Other'
      ]
    };

    res.json(metadata);
  } catch (error) {
    console.error('Get leads metadata error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Lead:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         company:
 *           type: string
 *         title:
 *           type: string
 *         status:
 *           type: string
 *           enum: [NEW, PENDING, CONTACTED, QUALIFIED, UNQUALIFIED, CONVERTED]
 *         leadSource:
 *           type: string
 *           enum: [WEB, PHONE_INQUIRY, PARTNER_REFERRAL, COLD_CALL, TRADE_SHOW, EMPLOYEE_REFERRAL, ADVERTISEMENT, OTHER]
 *         industry:
 *           type: string
 *         rating:
 *           type: string
 *           enum: [Hot, Warm, Cold]
 *         description:
 *           type: string
 *         isConverted:
 *           type: boolean
 *         convertedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /leads:
 *   get:
 *     summary: Get all leads for organization
 *     tags: [Leads]
 *     parameters:
 *       - in: header
 *         name: X-Organization-ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name, email, or company
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [NEW, PENDING, CONTACTED, QUALIFIED, UNQUALIFIED, CONVERTED]
 *         description: Filter by lead status
 *       - in: query
 *         name: leadSource
 *         schema:
 *           type: string
 *           enum: [WEB, PHONE_INQUIRY, PARTNER_REFERRAL, COLD_CALL, TRADE_SHOW, EMPLOYEE_REFERRAL, ADVERTISEMENT, OTHER]
 *         description: Filter by lead source
 *       - in: query
 *         name: industry
 *         schema:
 *           type: string
 *         description: Filter by industry
 *       - in: query
 *         name: rating
 *         schema:
 *           type: string
 *           enum: [Hot, Warm, Cold]
 *         description: Filter by rating
 *       - in: query
 *         name: converted
 *         schema:
 *           type: boolean
 *         description: Filter by conversion status
 *     responses:
 *       200:
 *         description: List of leads
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 leads:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lead'
 *                 pagination:
 *                   type: object
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      status,
      leadSource,
      industry,
      rating,
      converted
    } = req.query;

    // Build where conditions
    const conditions = [eq(schema.lead.organizationId, req.organizationId)];
    if (search) {
      const q = `%${search}%`;
      conditions.push(sql`${schema.lead.firstName} ILIKE ${q} OR ${schema.lead.lastName} ILIKE ${q} OR ${schema.lead.email} ILIKE ${q} OR ${schema.lead.company} ILIKE ${q}`);
    }
    if (status) conditions.push(eq(schema.lead.status, status));
    if (leadSource) conditions.push(eq(schema.lead.leadSource, leadSource));
    if (industry) conditions.push(ilike(schema.lead.industry, `%${industry}%`));
    if (rating) conditions.push(eq(schema.lead.rating, rating));
    if (converted !== undefined) conditions.push(eq(schema.lead.isConverted, converted === 'true'));

    const rows = await db
      .select({
        id: schema.lead.id,
        firstName: schema.lead.firstName,
        lastName: schema.lead.lastName,
        email: schema.lead.email,
        phone: schema.lead.phone,
        company: schema.lead.company,
        title: schema.lead.title,
        status: schema.lead.status,
        leadSource: schema.lead.leadSource,
        industry: schema.lead.industry,
        rating: schema.lead.rating,
        description: schema.lead.description,
        isConverted: schema.lead.isConverted,
        createdAt: schema.lead.createdAt,
        ownerId: schema.user.id,
        ownerName: schema.user.name,
        ownerEmail: schema.user.email
      })
      .from(schema.lead)
      .leftJoin(schema.user, eq(schema.user.id, schema.lead.ownerId))
      .where(and(...conditions))
      .orderBy(desc(schema.lead.createdAt))
      .limit(limit)
      .offset(skip);

    const [{ count: total }] = await db
      .select({ count: sql`count(*)`.as('count') })
      .from(schema.lead)
      .where(and(...conditions));

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.json({
      success: true,
      leads: rows.map((r) => ({
        id: r.id,
        firstName: r.firstName,
        lastName: r.lastName,
        email: r.email,
        phone: r.phone,
        company: r.company,
        title: r.title,
        status: r.status,
        leadSource: r.leadSource,
        industry: r.industry,
        rating: r.rating,
        description: r.description,
        isConverted: r.isConverted,
        createdAt: r.createdAt,
        owner: r.ownerId ? { id: r.ownerId, name: r.ownerName, email: r.ownerEmail } : null
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrev
      }
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /leads/{id}:
 *   get:
 *     summary: Get lead by ID
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: X-Organization-ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 *       404:
 *         description: Lead not found
 */
router.get('/:id', async (req, res) => {
  try {
    const [lead] = await db
      .select({
        id: schema.lead.id,
        firstName: schema.lead.firstName,
        lastName: schema.lead.lastName,
        email: schema.lead.email,
        phone: schema.lead.phone,
        company: schema.lead.company,
        title: schema.lead.title,
        status: schema.lead.status,
        leadSource: schema.lead.leadSource,
        industry: schema.lead.industry,
        rating: schema.lead.rating,
        description: schema.lead.description,
        isConverted: schema.lead.isConverted,
        createdAt: schema.lead.createdAt,
        ownerId: schema.user.id,
        ownerName: schema.user.name,
        ownerEmail: schema.user.email
      })
      .from(schema.lead)
      .leftJoin(schema.user, eq(schema.user.id, schema.lead.ownerId))
      .where(and(eq(schema.lead.id, req.params.id), eq(schema.lead.organizationId, req.organizationId)))
      .limit(1);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json({
      id: lead.id,
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      title: lead.title,
      status: lead.status,
      leadSource: lead.leadSource,
      industry: lead.industry,
      rating: lead.rating,
      description: lead.description,
      isConverted: lead.isConverted,
      createdAt: lead.createdAt,
      owner: lead.ownerId ? { id: lead.ownerId, name: lead.ownerName, email: lead.ownerEmail } : null
    });
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /leads:
 *   post:
 *     summary: Create a new lead
 *     tags: [Leads]
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
 *               - firstName
 *               - lastName
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [NEW, PENDING, CONTACTED, QUALIFIED, UNQUALIFIED, CONVERTED]
 *               leadSource:
 *                 type: string
 *                 enum: [WEB, PHONE_INQUIRY, PARTNER_REFERRAL, COLD_CALL, TRADE_SHOW, EMPLOYEE_REFERRAL, ADVERTISEMENT, OTHER]
 *               industry:
 *                 type: string
 *               rating:
 *                 type: string
 *                 enum: [Hot, Warm, Cold]
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lead created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      title,
      status,
      leadSource,
      industry,
      rating,
      description
    } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate status if provided
    const validStatuses = ['NEW', 'PENDING', 'CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'CONVERTED'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    // Validate leadSource if provided
    const validSources = ['WEB', 'PHONE_INQUIRY', 'PARTNER_REFERRAL', 'COLD_CALL', 'TRADE_SHOW', 'EMPLOYEE_REFERRAL', 'ADVERTISEMENT', 'OTHER'];
    if (leadSource && !validSources.includes(leadSource)) {
      return res.status(400).json({ error: 'Invalid lead source value' });
    }

    // Validate rating if provided
    const validRatings = ['Hot', 'Warm', 'Cold'];
    if (rating && !validRatings.includes(rating)) {
      return res.status(400).json({ error: 'Invalid rating value' });
    }

    const [inserted] = await db
      .insert(schema.lead)
      .values({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        title: title?.trim() || null,
        status: status || 'PENDING',
        leadSource: leadSource || null,
        industry: industry?.trim() || null,
        rating: rating || null,
        description: description?.trim() || null,
        organizationId: req.organizationId,
        ownerId: req.userId
      })
      .returning({ id: schema.lead.id });

    const [row] = await db
      .select({
        id: schema.lead.id,
        firstName: schema.lead.firstName,
        lastName: schema.lead.lastName,
        email: schema.lead.email,
        phone: schema.lead.phone,
        company: schema.lead.company,
        title: schema.lead.title,
        status: schema.lead.status,
        leadSource: schema.lead.leadSource,
        industry: schema.lead.industry,
        rating: schema.lead.rating,
        description: schema.lead.description,
        isConverted: schema.lead.isConverted,
        createdAt: schema.lead.createdAt,
        ownerId: schema.user.id,
        ownerName: schema.user.name,
        ownerEmail: schema.user.email
      })
      .from(schema.lead)
      .leftJoin(schema.user, eq(schema.user.id, schema.lead.ownerId))
      .where(eq(schema.lead.id, inserted.id))
      .limit(1);

    res.status(201).json({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      phone: row.phone,
      company: row.company,
      title: row.title,
      status: row.status,
      leadSource: row.leadSource,
      industry: row.industry,
      rating: row.rating,
      description: row.description,
      isConverted: row.isConverted,
      createdAt: row.createdAt,
      owner: row.ownerId ? { id: row.ownerId, name: row.ownerName, email: row.ownerEmail } : null
    });
  } catch (error) {
    console.error('Create lead error:', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'A lead with this email already exists in this organization' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;