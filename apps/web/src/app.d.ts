import type { AuthType } from './lib/auth';
import type { DrizzleClient } from '@opensource-startup-crm/database';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            db: DrizzleClient;
            auth: AuthType;
            user: AuthType["$Infer"]["Session"]["user"] | null;
            org?: { id: string; name: string } | null;
            session: AuthType["$Infer"]["Session"]["session"] | null;
        }
        // interface PageData {}
        // interface PageState {}
        interface Platform {
            env: Env;
        }
    }
}

export { };
