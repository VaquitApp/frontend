import { get } from '$lib/api';
import { getAuthHeader } from '$lib/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const groups: Group[] = await get('group', getAuthHeader(cookies));
	return { groups };
};
