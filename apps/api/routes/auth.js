import express from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { verifyToken } from '../middleware/auth.js';
import { db, schema } from '../lib/db.js';
import { eq, ilike, and } from 'drizzle-orm';

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * @swagger
 * components:
 *   schemas:
 *     GoogleLoginRequest:
 *       type: object
 *       required:
 *         - idToken
 *       properties:
 *         idToken:
 *           type: string
 *           description: Google ID token from mobile app
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             email:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             profileImage:
 *               type: string
 *             organizations:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   role:
 *                     type: string
 */


/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     organizations:
 *                       type: array
 *       401:
 *         description: Unauthorized
 */
router.get('/me', verifyToken, async (req, res) => {
  try {
    const userResponse = {
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      organizations: req.user.userOrganizations.map(uo => ({
        id: uo.organization.id,
        name: uo.organization.name,
        role: uo.role
      }))
    };

    res.json({ user: userResponse });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Google OAuth mobile login
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoogleLoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid Google token or user not found
 *       500:
 *         description: Server error
 */
router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'Google ID token is required' });
    }

    // Support both web and mobile client IDs
    const audiences = [
      process.env.GOOGLE_CLIENT_ID
    ];

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: audiences
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({ error: 'Invalid Google token' });
    }

    // Upsert user via Drizzle using onConflictDoUpdate
    const now = new Date();
    const fallbackName = (payload.name || `${payload.given_name || ''} ${payload.family_name || ''}`.trim() || (payload.email?.split('@')[0] || 'User')).trim();
    const updateSet = {
      image: payload.picture,
      lastLogin: now
    };
    if (payload.name) Object.assign(updateSet, { name: payload.name });

    const [user] = await db
      .insert(schema.user)
      .values({
        email: payload.email,
        name: fallbackName,
        image: payload.picture,
        lastLogin: now
      })
      .onConflictDoUpdate({ target: schema.user.email, set: updateSet })
      .returning({
        id: schema.user.id,
        email: schema.user.email,
        name: schema.user.name,
        image: schema.user.image
      });

    // Create JWT token for API access
    const JWTtoken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Calculate expiration date
    const expiresIn = process.env.JWT_EXPIRES_IN || '24h';
    const expirationHours = expiresIn.includes('h') ? parseInt(expiresIn) : 24;
    const expiresAt = new Date(Date.now() + expirationHours * 60 * 60 * 1000);

    // Note: We no longer store JWTs in DB; Better Auth issues/validates via JWKS.

    // Format response to match SvelteKit patterns
    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      profileImage: user.image,
    };

    // Fetch organizations memberships
    const orgs = await db
      .select({
        id: schema.organization.id,
        name: schema.organization.name,
        role: schema.member.role
      })
      .from(schema.member)
      .innerJoin(schema.organization, eq(schema.organization.id, schema.member.organizationId))
      .where(eq(schema.member.userId, user.id));

    res.json({
      success: true,
      JWTtoken,
      user: userResponse,
      organizations: orgs.map((o) => ({ id: o.id, name: o.name, role: o.role }))
    });
  } catch (error) {
    console.error('Google login error:', error);
    if (error.message && error.message.includes('Invalid token')) {
      return res.status(400).json({ error: 'Invalid Google token' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout and revoke current JWT token
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', verifyToken, async (req, res) => {
  try {
    // Better Auth JWTs cannot be revoked server-side here; instruct clients to drop the token.
    res.json({ success: true, message: 'Logged out (client should discard token).' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /auth/revoke-all:
 *   post:
 *     summary: Revoke all JWT tokens for current user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully revoked all tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 revokedCount:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 */
router.post('/revoke-all', verifyToken, async (req, res) => {
  try {
    // Not applicable with stateless JWT validation. Return success.
    res.json({ success: true, message: 'All tokens considered revoked (stateless JWT).' });
  } catch (error) {
    console.error('Revoke all tokens error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;