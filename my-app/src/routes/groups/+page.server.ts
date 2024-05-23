import { groupService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const groups: Group[] = await groupService.listAll(cookies);
	return { groups };
};
