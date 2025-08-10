import { createRemoteJWKSet, jwtVerify } from 'jose';
import { db, schema } from '../lib/db.js';
import { eq, innerJoin } from 'drizzle-orm';

// Verify Better Auth JWTs using JWKS
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const baseUrl = process.env.PUBLIC_APP_URL || 'http://localhost:5173';
    const jwks = createRemoteJWKSet(new URL(`${baseUrl}/api/auth/jwks`));

    const { payload } = await jwtVerify(token, jwks, {
      // audience / issuer can be configured if you set them in Better Auth
    });

    const userId = payload.sub;
    if (!userId) {
      return res.status(401).json({ error: 'Invalid token: missing subject.' });
    }

    // Fetch user and memberships via Drizzle
    const [user] = await db
      .select({
        id: schema.user.id,
        email: schema.user.email,
        name: schema.user.name,
        image: schema.user.image
      })
      .from(schema.user)
      .where(eq(schema.user.id, userId));

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    const memberships = await db
      .select({
        organizationId: schema.member.organizationId,
        role: schema.member.role,
        organization: {
          id: schema.organization.id,
          name: schema.organization.name,
          domain: schema.organization.domain
        }
      })
      .from(schema.member)
      .innerJoin(schema.organization, eq(schema.organization.id, schema.member.organizationId))
      .where(eq(schema.member.userId, userId));

    req.user = user;
    req.userId = user.id;
    req.memberships = memberships;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Token validation failed.' });
  }
};

export const requireOrganization = async (req, res, next) => {
  try {
    const organizationId = req.header('X-Organization-ID');

    if (!organizationId) {
      return res.status(400).json({ error: 'Organization ID is required in X-Organization-ID header.' });
    }

    const userOrg = (req.memberships || []).find(
      (uo) => uo.organizationId === organizationId
    );

    if (!userOrg) {
      return res.status(403).json({ error: 'Access denied to this organization.' });
    }

    req.organizationId = organizationId;
    req.userRole = userOrg.role;
    req.organization = userOrg.organization;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Insufficient permissions.' });
    }
    next();
  };
};

export const requireSuperAdmin = (req, res, next) => {
  if (!req.user.email.endsWith('@micropyramid.com')) {
    return res.status(403).json({ error: 'Super admin access required.' });
  }
  next();
};