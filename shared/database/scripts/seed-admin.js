#!/usr/bin/env node

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { schema } from '../dist/index.mjs';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../../..', '.env') });
dotenv.config({ path: join(__dirname, '../../../apps/web', '.dev.vars') });

const DEV_DATABASE_URL = process.env.DEV_DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres';

async function seedAdminUser() {
    // Only run in development environment
    if (process.env.NODE_ENV === 'production' || process.env.ENV_TYPE === 'production') {
        console.error('❌ This script should only be run in development environment!');
        process.exit(1);
    }

    const sql = postgres(DEV_DATABASE_URL);
    const db = drizzle(sql, { schema });

    try {
        console.log('🔍 Checking for existing admin user...');
        
        // Check if admin user already exists
        const existingUser = await db.select()
            .from(schema.user)
            .where(eq(schema.user.email, 'admin@test.com'))
            .limit(1);

        if (existingUser.length > 0) {
            console.log('✅ Admin user already exists, skipping creation');
            await sql.end();
            return;
        }

        console.log('📝 Creating admin user...');

        // Create admin user
        const userId = 'dev_admin_user_' + Date.now();
        const now = new Date();
        
        await db.insert(schema.user).values({
            id: userId,
            name: 'Dev Admin',
            email: 'admin@test.com',
            emailVerified: true,
            image: null,
            createdAt: now,
            updatedAt: now,
            role: 'admin'
        });

        // Create account with hashed password
        // Password: admin12345 (hashed with scrypt for Better Auth)
        await db.insert(schema.account).values({
            id: 'dev_admin_account_' + Date.now(),
            userId: userId,
            accountId: 'admin@test.com',
            providerId: 'credential',
            accessToken: null,
            refreshToken: null,
            accessTokenExpiresAt: null,
            refreshTokenExpiresAt: null,
            scope: null,
            idToken: null,
            // Scrypt hash for 'admin12345'
            password: '$scrypt$16384$8$1$v8F7yLqGPBSuMxm3QrjfKQ$qUiEvposZUvqm5S7TD0mVNVX0mLJLvT1bdYrH7bdphs',
            createdAt: now,
            updatedAt: now
        });

        console.log('✅ Admin user created successfully!');
        console.log('   Email: admin@test.com');
        console.log('   Password: admin12345');

    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        process.exit(1);
    } finally {
        await sql.end();
    }
}

// Run the seed function
seedAdminUser();