import { groupService, spendingService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const id = Number(params.id);
	const group: Group = await groupService.list(cookies);
	const spendings: Spending[] = await spendingService.list(id, cookies);
	return { group, spendings };
};
