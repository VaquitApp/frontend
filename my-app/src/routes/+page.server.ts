import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	// TODO: fetch username from backend, or use cookies
	const user = cookies.get('jwt');
	if (user !== undefined) {
		return { user: user };
	}
	return {};
};
