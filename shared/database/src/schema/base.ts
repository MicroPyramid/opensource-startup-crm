import {
    pgTable as table,
} from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";
import * as t from "drizzle-orm/pg-core";


export const user = table("user", {
    id: t.text("id").primaryKey().$defaultFn(() => randomUUID()),
    name: t.text("name").notNull(),
    email: t.text("email").notNull().unique(),
    emailVerified: t.boolean("email_verified")
        .$defaultFn(() => false)
        .notNull(),
    image: t.text("image"),
    createdAt: t.timestamp("created_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: t.timestamp("updated_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    role: t.text("role"),
    banned: t.boolean("banned"),
    banReason: t.text("ban_reason"),
    banExpires: t.timestamp("ban_expires"),
    // ---- App-specific additions (non Better Auth core) ----
    phone: t.text("phone"),
    department: t.text("department"),
    isActive: t.boolean("is_active"),
    lastLogin: t.timestamp("last_login"),
});

export const session = table("session", {
    id: t.text("id").primaryKey().$defaultFn(() => randomUUID()),
    expiresAt: t.timestamp("expires_at").notNull(),
    token: t.text("token").notNull().unique(),
    createdAt: t.timestamp("created_at").notNull(),
    updatedAt: t.timestamp("updated_at").notNull(),
    ipAddress: t.text("ip_address"),
    userAgent: t.text("user_agent"),
    userId: t.text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: t.text("impersonated_by"),
    activeOrganizationId: t.text("active_organization_id"),
});

export const account = table("account", {
    id: t.text("id").primaryKey().$defaultFn(() => randomUUID()),
    accountId: t.text("account_id").notNull(),
    providerId: t.text("provider_id").notNull(),
    userId: t.text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: t.text("access_token"),
    refreshToken: t.text("refresh_token"),
    idToken: t.text("id_token"),
    accessTokenExpiresAt: t.timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at"),
    scope: t.text("scope"),
    password: t.text("password"),
    createdAt: t.timestamp("created_at").notNull(),
    updatedAt: t.timestamp("updated_at").notNull(),
});

export const verification = table("verification", {
    id: t.text("id").primaryKey().$defaultFn(() => randomUUID()),
    identifier: t.text("identifier").notNull(),
    value: t.text("value").notNull(),
    expiresAt: t.timestamp("expires_at").notNull(),
    createdAt: t.timestamp("created_at").$defaultFn(
        () => /* @__PURE__ */ new Date(),
    ),
    updatedAt: t.timestamp("updated_at").$defaultFn(
        () => /* @__PURE__ */ new Date(),
    ),
});

export const ssoProvider = table("sso_provider", {
    id: t.text("id").primaryKey().$defaultFn(() => randomUUID()),
    issuer: t.text("issuer").notNull(),
    oidcConfig: t.text("oidc_config"),
    samlConfig: t.text("saml_config"),
    userId: t.text("user_id").references(() => user.id, { onDelete: "cascade" }),
    providerId: t.text("provider_id").notNull().unique(),
    organizationId: t.text("organization_id"),
    domain: t.text("domain").notNull(),
});

export const organization = table("organization", {
    id: t.text("id").primaryKey().$defaultFn(() => randomUUID()),
    name: t.text("name").notNull(),
    slug: t.text("slug").unique(),
    logo: t.text("logo"),
    // ---- App-specific additions (non Better Auth core) ----
    // Fields migrated from organizationProfile table
    domain: t.text("domain"),
    website: t.text("website"),
    industry: t.text("industry"),
    description: t.text("description"),
    isActive: t.boolean("is_active"),
    updatedAt: t.timestamp("updated_at").$defaultFn(() => /* @__PURE__ */ new Date()),
    createdAt: t.timestamp("created_at").notNull(),
    metadata: t.text("metadata"),
});

export const member = table("member", {
    id: t.text("id").primaryKey().$defaultFn(() => randomUUID()),
    organizationId: t.text("organization_id")
        .notNull()
        .references(() => organization.id, { onDelete: "cascade" }),
    userId: t.text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    role: t.text("role").default("member").notNull(),
    createdAt: t.timestamp("created_at").notNull().$defaultFn(() => /* @__PURE__ */ new Date()),
});

export const invitation = table("invitation", {
    id: t.text("id").primaryKey().$defaultFn(() => randomUUID()),
    organizationId: t.text("organization_id")
        .notNull()
        .references(() => organization.id, { onDelete: "cascade" }),
    email: t.text("email").notNull(),
    role: t.text("role"),
    status: t.text("status").default("pending").notNull(),
    expiresAt: t.timestamp("expires_at").notNull(),
    inviterId: t.text("inviter_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});

export const jwks = table("jwks", {
    id: t.text("id").primaryKey().$defaultFn(() => randomUUID()),
    publicKey: t.text("public_key").notNull(),
    privateKey: t.text("private_key").notNull(),
    createdAt: t.timestamp("created_at").notNull().$defaultFn(() => /* @__PURE__ */ new Date()),
});