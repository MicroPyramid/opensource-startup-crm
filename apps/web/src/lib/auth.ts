import { betterAuth } from 'better-auth';
import { organization } from 'better-auth/plugins';
import { jwt } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import type { DrizzleClient } from '@opensource-startup-crm/database';


export function createAuth(env: Env, db: DrizzleClient) {
  return betterAuth({
    baseURL: env.BASE_URL || 'http://localhost:5173',
    emailAndPassword: { enabled: true },
    database: drizzleAdapter(db, {
      provider: 'pg',
    }),
    socialProviders: {
      google: {
        clientId: env?.GOOGLE_CLIENT_ID || '',
        clientSecret: env?.GOOGLE_CLIENT_SECRET || '',
        enabled: !!env?.GOOGLE_CLIENT_ID && !!env?.GOOGLE_CLIENT_SECRET
      }
    },
    plugins: [
      organization({
        schema: {
          organization: {
            additionalFields: {
              domain: { type: 'string', input: true, required: false },
              website: { type: 'string', input: true, required: false },
              industry: { type: 'string', input: true, required: false },
              description: { type: 'string', input: true, required: false },
              isActive: { type: 'boolean', input: true, required: false }
            }
          },
          member: {
            additionalFields: {}
          },
          invitation: {
            additionalFields: {}
          }
        }
      }),
      jwt()
    ]
  });
}

export type AuthType = ReturnType<typeof createAuth>;


