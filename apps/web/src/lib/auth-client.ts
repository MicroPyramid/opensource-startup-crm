import { createAuthClient } from 'better-auth/client';
import { organizationClient, inferOrgAdditionalFields } from 'better-auth/client/plugins';
import type { AuthType } from '$lib/auth';

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : process.env.PUBLIC_APP_URL || 'http://localhost:5173',
  plugins: [
    organizationClient({
      schema: inferOrgAdditionalFields<AuthType>()
    })
  ]
});


