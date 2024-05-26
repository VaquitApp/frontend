import { groupService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const id = Number(params.id);
	const group: Group = await groupService.get(id, cookies);
	// TODO
	const memberBalances = [
		{ email: 'a@example.com', balance: 100 },
		{ email: 'b@example.com', balance: -100 },
		{ email: 'c@example.com', balance: 0 }
	];
	return { group, memberBalances };
};
