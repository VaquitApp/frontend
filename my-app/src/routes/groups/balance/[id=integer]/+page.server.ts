import { getUserId } from '$lib/auth';
import { groupService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const id = Number(params.id);
	const group: Group = await groupService.get(id, cookies);
	const groupMembers: User[] = await groupService.listAllMembers(id, cookies);

	const memberBalances: Balance[] = await groupService.listAllMemberBalances(id, cookies);

	const userId = getUserId(cookies);
	const userBalance = memberBalances.find(({ user_id }) => user_id === userId)!.current_balance;
	const otherBalances = memberBalances.filter(({ user_id }) => user_id !== userId);

	const balances = otherBalances.map(({ user_id, current_balance }) => {
		const email = groupMembers.find(({ id }) => id === user_id)!.email;
		return { email, balance: current_balance };
	});
	return { group, balances, userBalance };
};
