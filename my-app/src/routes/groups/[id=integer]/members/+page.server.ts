import { groupService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const id = Number(params.id);
	const members: User[] = await groupService.listAllMembers(id, cookies);
	return { members };
};
