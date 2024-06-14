import { clearUserCredentials } from '$lib/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	clearUserCredentials(cookies);
};
