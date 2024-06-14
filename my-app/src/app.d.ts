// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			userId?: Id;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
