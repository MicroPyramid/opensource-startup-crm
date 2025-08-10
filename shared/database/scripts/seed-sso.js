#!/usr/bin/env node
/**
 * This script creates an SSO provider for Microsoft Entra authentication
 * 
 * Usage:
 * node scripts/seed-sso.js <client_id> <client_secret>
 * 
 * Examples:
 * node scripts/seed-sso.js abc123 secret456
 * 
 * Requires DATABASE_URL environment variable to be set
 */

const postgres = require('postgres');
const crypto = require('crypto');
const config = require('dotenv').config
config()

// Parse CLI arguments
const args = process.argv.slice(2);
const MICROSOFT_CLIENT_ID = process.env?.MICROSOFT_CLIENT_ID || args[0];
const MICROSOFT_CLIENT_SECRET = process.env?.MICROSOFT_CLIENT_SECRET || args[1];

if (!MICROSOFT_CLIENT_ID || !MICROSOFT_CLIENT_SECRET) {
    console.error('❌ Missing required arguments');
    console.error('');
    console.error('Usage: node scripts/seed-sso.js <client_id> <client_secret>');
    console.error('');
    console.error('Example:');
    console.error('  node scripts/seed-sso.js abc123 secret456');
    process.exit(1);
}

// Check for DATABASE_URL
const DATABASE_URL = process.env.DATABASE_URL || process.env.DEV_DATABASE_URL;
if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL or DEV_DATABASE_URL environment variable is not set');
    console.error('');
    console.error('Please set one of these environment variables:');
    console.error('  export DATABASE_URL=postgresql://user:password@localhost:5432/dbname');
    console.error('  export DEV_DATABASE_URL=postgresql://user:password@localhost:5432/dbname');
    process.exit(1);
}

const app_registration_id = "318ba7a3-5a50-46d1-8021-b2bec9088b82";

// Create the config object
const configObject = {
    issuer: `https://login.microsoftonline.com/${app_registration_id}/v2.0`,
    clientId: MICROSOFT_CLIENT_ID,
    clientSecret: MICROSOFT_CLIENT_SECRET,
    authorizationEndpoint: `https://login.microsoftonline.com/${app_registration_id}/oauth2/v2.0/authorize`,
    tokenEndpoint: `https://login.microsoftonline.com/${app_registration_id}/oauth2/v2.0/token`,
    jwksEndpoint: `https://login.microsoftonline.com/common/discovery/v2.0/keys`,
    discoveryEndpoint: `https://login.microsoftonline.com/${app_registration_id}/v2.0/.well-known/openid-configuration`,
    pkce: true,
    scopes: ["openid", "email", "profile"],
    mapping: {
        id: "sub",
        email: "email",
        emailVerified: "email_verified",
        name: "name",
        image: "picture",
        roles: "roles",
        groups: "groups"
    },
    overrideUserInfo: false
};

async function seedSSO() {
    const sql = postgres(DATABASE_URL);

    try {
        console.log('🌱 Seeding MedStaffer SSO provider...');

        // Check if SSO provider exists
        console.log('📋 Checking for existing SSO provider...');
        const existing = await sql`
            SELECT id FROM sso_provider WHERE provider_id = 'medstaffer-microsoft'
        `;

        if (existing.length > 0) {
            console.log('✓ SSO provider already exists');
        } else {
            // Create SSO provider
            console.log('📝 Creating SSO provider...');
            const ssoProviderId = crypto.randomUUID();

            await sql`
                INSERT INTO sso_provider (
                    id, 
                    provider_id, 
                    issuer, 
                    domain, 
                    oidc_config, 
                    saml_config, 
                    user_id,
                    organization_id
                ) 
                VALUES (
                    ${ssoProviderId}, 
                    'medstaffer-microsoft', 
                    ${'https://login.microsoftonline.com/' + app_registration_id + '/v2.0'}, 
                    'medstaffer.com', 
                    ${JSON.stringify(configObject)}, 
                    NULL, 
                    NULL,
                    NULL
                )
            `;

            console.log('✓ SSO provider created');
        }

        console.log('✅ MedStaffer SSO provider setup completed successfully');
    } catch (error) {
        console.error('❌ Failed:', error.message);
        process.exit(1);
    } finally {
        await sql.end();
    }
}

seedSSO();