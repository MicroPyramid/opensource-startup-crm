// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: any; // You might want to replace 'any' with a more specific type for user
			org?: any; // You might want to replace 'any' with a more specific type for org
			org_name?: string;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
