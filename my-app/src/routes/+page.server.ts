import { getUserEmail } from '$lib/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	// TODO: fetch username from backend, or use cookies
	const userEmail = getUserEmail(cookies);
	if (userEmail === undefined) {
		return {};
	}
	return { user: userEmail };
};
