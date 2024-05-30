import { groupService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const id = Number(params.id) || 0;
	const group: Group = await groupService.get(id, cookies);
	const members: User[] = id ? await groupService.listAllMembers(id, cookies) : [];
	return { group, members };
};
