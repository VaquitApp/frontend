import { getUserEmail, getUserId } from '$lib/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, depends }) => {
	// TODO: fetch username from backend, or use cookies
	const userEmail = getUserEmail(cookies);
	if (userEmail === undefined) {
		return {};
	}
	return { user: userEmail, userId: getUserId(cookies) };
};
