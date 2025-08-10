import express from 'express';
import { db, schema } from '../lib/db.js';
import { and, desc, eq } from 'drizzle-orm';
import { verifyToken, requireOrganization } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);
router.use(requireOrganization);

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts for organization
 *     tags: [Contacts]
 *     parameters:
 *       - in: header
 *         name: X-Organization-ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of contacts
 */
router.get('/', async (req, res) => {
  try {
    // Single query with joins for owner and primary related account
    const rows = await db
      .select({
        id: schema.contact.id,
        firstName: schema.contact.firstName,
        lastName: schema.contact.lastName,
        email: schema.contact.email,
        phone: schema.contact.phone,
        title: schema.contact.title,
        department: schema.contact.department,
        createdAt: schema.contact.createdAt,
        ownerId: schema.user.id,
        ownerName: schema.user.name,
        ownerEmail: schema.user.email,
        relContactId: schema.accountContactRelationship.contactId,
        relAccountId: schema.crmAccount.id,
        relAccountName: schema.crmAccount.name
      })
      .from(schema.contact)
      .leftJoin(schema.user, eq(schema.user.id, schema.contact.ownerId))
      .leftJoin(
        schema.accountContactRelationship,
        and(
          eq(schema.accountContactRelationship.contactId, schema.contact.id),
          eq(schema.accountContactRelationship.isPrimary, true)
        )
      )
      .leftJoin(
        schema.crmAccount,
        and(
          eq(schema.crmAccount.id, schema.accountContactRelationship.accountId),
          eq(schema.crmAccount.organizationId, req.organizationId)
        )
      )
      .where(eq(schema.contact.organizationId, req.organizationId))
      .orderBy(desc(schema.contact.createdAt));

    // Group by contact
    const byId = new Map();
    for (const r of rows) {
      if (!byId.has(r.id)) {
        byId.set(r.id, {
          id: r.id,
          firstName: r.firstName,
          lastName: r.lastName,
          email: r.email,
          phone: r.phone,
          title: r.title,
          department: r.department,
          createdAt: r.createdAt,
          relatedAccounts: [],
          owner: r.ownerId ? { id: r.ownerId, name: r.ownerName, email: r.ownerEmail } : null
        });
      }
      if (r.relAccountId) {
        byId.get(r.id).relatedAccounts.push({ account: { id: r.relAccountId, name: r.relAccountName } });
      }
    }

    res.json({ contacts: Array.from(byId.values()) });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
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
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               title:
 *                 type: string
 *               department:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               country:
 *                 type: string
 *               description:
 *                 type: string
 *               accountId:
 *                 type: string
 *                 description: UUID of the account to associate with this contact
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, title, department, street, city, state, postalCode, country, description, accountId } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'First name and last name are required' });
    }

    // Validate account if provided
    if (accountId) {
      const [account] = await db
        .select({ id: schema.crmAccount.id })
        .from(schema.crmAccount)
        .where(and(eq(schema.crmAccount.id, accountId), eq(schema.crmAccount.organizationId, req.organizationId)));
      if (!account) return res.status(400).json({ error: 'Account not found in your organization' });
    }

    // Check for duplicate email within the organization if email is provided
    if (email) {
      const [existingContact] = await db
        .select({ id: schema.contact.id })
        .from(schema.contact)
        .where(and(eq(schema.contact.email, email), eq(schema.contact.organizationId, req.organizationId)));
      if (existingContact) return res.status(400).json({ error: 'A contact with this email already exists in this organization' });
    }

    // Create the contact
    const [contact] = await db
      .insert(schema.contact)
      .values({
        firstName,
        lastName,
        email: email || null,
        phone: phone || null,
        title: title || null,
        department: department || null,
        street: street || null,
        city: city || null,
        state: state || null,
        postalCode: postalCode || null,
        country: country || null,
        description: description || null,
        organizationId: req.organizationId,
        ownerId: req.userId
      })
      .returning({ id: schema.contact.id });

    // Create account-contact relationship if accountId is provided
    if (accountId) {
      await db.insert(schema.accountContactRelationship).values({
        accountId,
        contactId: contact.id,
        isPrimary: true
      });
    }

    // Fetch the created contact with relationships (single joined query)
    const createdRows = await db
      .select({
        id: schema.contact.id,
        firstName: schema.contact.firstName,
        lastName: schema.contact.lastName,
        email: schema.contact.email,
        phone: schema.contact.phone,
        title: schema.contact.title,
        department: schema.contact.department,
        ownerId: schema.user.id,
        ownerName: schema.user.name,
        ownerEmail: schema.user.email,
        relAccountId: schema.crmAccount.id,
        relAccountName: schema.crmAccount.name
      })
      .from(schema.contact)
      .leftJoin(schema.user, eq(schema.user.id, schema.contact.ownerId))
      .leftJoin(schema.accountContactRelationship, eq(schema.accountContactRelationship.contactId, schema.contact.id))
      .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.accountContactRelationship.accountId))
      .where(eq(schema.contact.id, contact.id));

    const base = createdRows[0];
    const response = {
      id: base.id,
      firstName: base.firstName,
      lastName: base.lastName,
      email: base.email,
      phone: base.phone,
      title: base.title,
      department: base.department,
      ownerId: base.ownerId,
      ownerName: base.ownerName,
      ownerEmail: base.ownerEmail,
      relatedAccounts: createdRows
        .filter((r) => r.relAccountId)
        .map((r) => ({ account: { id: r.relAccountId, name: r.relAccountName } }))
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a specific contact by ID
 *     tags: [Contacts]
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
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact details
 *       404:
 *         description: Contact not found
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [row] = await db
      .select({
        id: schema.contact.id,
        firstName: schema.contact.firstName,
        lastName: schema.contact.lastName,
        email: schema.contact.email,
        phone: schema.contact.phone,
        title: schema.contact.title,
        department: schema.contact.department,
        description: schema.contact.description,
        street: schema.contact.street,
        city: schema.contact.city,
        state: schema.contact.state,
        postalCode: schema.contact.postalCode,
        country: schema.contact.country,
        createdAt: schema.contact.createdAt,
        ownerId: schema.user.id,
        ownerName: schema.user.name,
        ownerEmail: schema.user.email,
        orgId: schema.organization.id,
        orgName: schema.organization.name
      })
      .from(schema.contact)
      .leftJoin(schema.user, eq(schema.user.id, schema.contact.ownerId))
      .leftJoin(schema.organization, eq(schema.organization.id, schema.contact.organizationId))
      .where(and(eq(schema.contact.id, id), eq(schema.contact.organizationId, req.organizationId)));

    if (!row) return res.status(404).json({ error: 'Contact not found' });

    // Fetch related accounts via single join query and aggregate
    const rows = await db
      .select({
        id: schema.contact.id,
        firstName: schema.contact.firstName,
        lastName: schema.contact.lastName,
        email: schema.contact.email,
        phone: schema.contact.phone,
        title: schema.contact.title,
        department: schema.contact.department,
        description: schema.contact.description,
        street: schema.contact.street,
        city: schema.contact.city,
        state: schema.contact.state,
        postalCode: schema.contact.postalCode,
        country: schema.contact.country,
        createdAt: schema.contact.createdAt,
        ownerId: schema.user.id,
        ownerName: schema.user.name,
        ownerEmail: schema.user.email,
        orgId: schema.organization.id,
        orgName: schema.organization.name,
        relAccountId: schema.crmAccount.id,
        relAccountName: schema.crmAccount.name,
        relAccountType: schema.crmAccount.type,
        relAccountWebsite: schema.crmAccount.website,
        relAccountPhone: schema.crmAccount.phone
      })
      .from(schema.contact)
      .leftJoin(schema.user, eq(schema.user.id, schema.contact.ownerId))
      .leftJoin(schema.organization, eq(schema.organization.id, schema.contact.organizationId))
      .leftJoin(schema.accountContactRelationship, eq(schema.accountContactRelationship.contactId, schema.contact.id))
      .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.accountContactRelationship.accountId))
      .where(and(eq(schema.contact.id, id), eq(schema.contact.organizationId, req.organizationId)));

    const baseRow = rows[0];
    const response = {
      id: baseRow.id,
      firstName: baseRow.firstName,
      lastName: baseRow.lastName,
      email: baseRow.email,
      phone: baseRow.phone,
      title: baseRow.title,
      department: baseRow.department,
      description: baseRow.description,
      street: baseRow.street,
      city: baseRow.city,
      state: baseRow.state,
      postalCode: baseRow.postalCode,
      country: baseRow.country,
      createdAt: baseRow.createdAt,
      relatedAccounts: rows.filter((r) => r.relAccountId).map((r) => ({ account: { id: r.relAccountId, name: r.relAccountName, type: r.relAccountType, website: r.relAccountWebsite, phone: r.relAccountPhone } })),
      owner: baseRow.ownerId ? { id: baseRow.ownerId, name: baseRow.ownerName, email: baseRow.ownerEmail } : null,
      organization: baseRow.orgId ? { id: baseRow.orgId, name: baseRow.orgName } : null
    };

    res.json(response);
  } catch (error) {
    console.error('Get contact details error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;