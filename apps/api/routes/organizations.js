import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { db, schema } from '../lib/db.js';
import { and, eq, ilike, sql } from 'drizzle-orm';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         domain:
 *           type: string
 *         logo:
 *           type: string
 *         website:
 *           type: string
 *         industry:
 *           type: string
 *         description:
 *           type: string
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         userRole:
 *           type: string
 *           enum: [ADMIN, USER]
 *     CreateOrganizationRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         domain:
 *           type: string
 *         logo:
 *           type: string
 *         website:
 *           type: string
 *         industry:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /organizations:
 *   get:
 *     summary: Get organizations list for the authenticated user
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of organizations per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter organizations by name
 *       - in: query
 *         name: industry
 *         schema:
 *           type: string
 *         description: Filter by industry
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: List of organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 organizations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Organization'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     hasNext:
 *                       type: boolean
 *                     hasPrev:
 *                       type: boolean
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const {
      page = 1,
      limit = 10,
      search,
      industry,
      active
    } = req.query;

    // Validate pagination parameters
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Build where clause for filtering
    let whereClause = {
      users: {
        some: {
          userId: userId
        }
      }
    };

    // Add search filter
    if (search) {
      whereClause.name = {
        contains: search,
        mode: 'insensitive'
      };
    }

    // Add industry filter
    if (industry) {
      whereClause.industry = {
        contains: industry,
        mode: 'insensitive'
      };
    }

    // Add active status filter
    if (active !== undefined) {
      whereClause.isActive = active === 'true';
    }

    // Get organizations with user role
    // Build Drizzle conditions
    const conditions = [eq(schema.member.userId, userId)];
    if (search) {
      conditions.push(ilike(schema.organization.name, `%${search}%`));
    }
    if (industry) {
      conditions.push(ilike(schema.organization.industry, `%${industry}%`));
    }
    if (active !== undefined) {
      conditions.push(eq(schema.organization.isActive, active === 'true'));
    }

    const organizations = await db
      .select({
        id: schema.organization.id,
        name: schema.organization.name,
        domain: schema.organization.domain,
        logo: schema.organization.logo,
        website: schema.organization.website,
        industry: schema.organization.industry,
        description: schema.organization.description,
        isActive: schema.organization.isActive,
        createdAt: schema.organization.createdAt,
        updatedAt: schema.organization.updatedAt,
        userRole: schema.member.role,
        joinedAt: schema.member.createdAt
      })
      .from(schema.organization)
      .innerJoin(schema.member, eq(schema.member.organizationId, schema.organization.id))
      .where(and(...conditions))
      .orderBy(schema.organization.name)
      .limit(limitNum)
      .offset(skip);

    const [{ count: totalCount }] = await db
      .select({ count: sql`count(distinct ${schema.organization.id})`.as('count') })
      .from(schema.organization)
      .innerJoin(schema.member, eq(schema.member.organizationId, schema.organization.id))
      .where(and(...conditions));

    // Format response
    const formattedOrganizations = organizations.map(org => ({
      id: org.id,
      name: org.name,
      domain: org.domain,
      logo: org.logo,
      website: org.website,
      industry: org.industry,
      description: org.description,
      isActive: org.isActive,
      createdAt: org.createdAt,
      updatedAt: org.updatedAt,
      userRole: (org.userRole || 'user').toUpperCase(),
      joinedAt: org.joinedAt
    }));

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limitNum);
    const hasNext = pageNum < totalPages;
    const hasPrev = pageNum > 1;

    res.json({
      success: true,
      organizations: formattedOrganizations,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalCount,
        totalPages,
        hasNext,
        hasPrev
      }
    });

  } catch (error) {
    console.error('Organizations list error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Create a new organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrganizationRequest'
 *     responses:
 *       201:
 *         description: Organization created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 organization:
 *                   $ref: '#/components/schemas/Organization'
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Organization with this name already exists
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const {
      name,
      domain,
      logo,
      website,
      industry,
      description
    } = req.body;

    // Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Organization name is required'
      });
    }

    // Check if organization with this name already exists (case-insensitive)
    const existing = await db
      .select({ id: schema.organization.id })
      .from(schema.organization)
      .where(ilike(schema.organization.name, name.trim()))
      .limit(1);

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'Organization with this name already exists'
      });
    }

    // Validate website URL format if provided
    if (website && website.trim()) {
      try {
        new URL(website.trim());
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: 'Invalid website URL format'
        });
      }
    }

    // Create organization
    const [orgInserted] = await db
      .insert(schema.organization)
      .values({
        name: name.trim(),
        domain: domain?.trim() || null,
        logo: logo?.trim() || null,
        website: website?.trim() || null,
        industry: industry?.trim() || null,
        description: description?.trim() || null,
        isActive: true
      })
      .returning({ id: schema.organization.id, createdAt: schema.organization.createdAt, updatedAt: schema.organization.updatedAt });

    // Add current user as admin member
    await db
      .insert(schema.member)
      .values({
        organizationId: orgInserted.id,
        userId: userId,
        role: 'admin'
      });

    // Fetch organization back with membership info for response
    const [organization] = await db
      .select({
        id: schema.organization.id,
        name: schema.organization.name,
        domain: schema.organization.domain,
        logo: schema.organization.logo,
        website: schema.organization.website,
        industry: schema.organization.industry,
        description: schema.organization.description,
        isActive: schema.organization.isActive,
        createdAt: schema.organization.createdAt,
        updatedAt: schema.organization.updatedAt,
        userRole: schema.member.role,
        joinedAt: schema.member.createdAt
      })
      .from(schema.organization)
      .innerJoin(schema.member, eq(schema.member.organizationId, schema.organization.id))
      .where(and(eq(schema.organization.id, orgInserted.id), eq(schema.member.userId, userId)))
      .limit(1);

    // Format response
    const formattedOrganization = {
      id: organization.id,
      name: organization.name,
      domain: organization.domain,
      logo: organization.logo,
      website: organization.website,
      industry: organization.industry,
      description: organization.description,
      isActive: organization.isActive,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
      userRole: (organization.userRole || 'admin').toUpperCase(),
      joinedAt: organization.joinedAt
    };

    res.status(201).json({
      success: true,
      organization: formattedOrganization
    });

  } catch (error) {
    console.error('Organization creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
