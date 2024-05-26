import { getUserId } from '$lib/auth';
import { groupService, spendingService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

type Balance = {
	id: number;
	email: string;
	balance: number;
};

export const load: PageServerLoad = async ({ cookies, params }) => {
	const id = Number(params.id);
	const group: Group = await groupService.get(id, cookies);
	const groupMembers: User[] = await groupService.listAllMembers(id, cookies);
	const spendings: Spending[] = await spendingService.list(id, cookies);

	const memberBalances = computeBalancesFromSpendings(groupMembers, spendings);

	const userId = getUserId(cookies);
	const userBalance = memberBalances.find(({ id }) => id === userId)!.balance;
	const otherBalances = memberBalances.filter(({ id }) => id !== userId);

	let balances;
	if (userBalance === 0) {
		balances = otherBalances.map((mb) => ({ ...mb, balance: 0 }));
	} else {
		balances = distributeBalances(otherBalances, userBalance);
	}
	return { group, balances, userBalance };
};

function computeBalancesFromSpendings(groupMembers: User[], spendings: Spending[]) {
	// TODO: move this computation to backend
	const groupSize = groupMembers.length;
	return groupMembers.map(({ id, email }) => {
		const balance = spendings
			.map(({ owner_id, amount }) =>
				owner_id === id ? (amount * (groupSize - 1)) / groupSize : -amount / groupSize
			)
			.reduce((a, b) => a + b, 0);
		return { id, email, balance };
	});
}

function distributeBalances(memberBalances: Balance[], userBalance: number) {
	const sign = Math.sign(userBalance);
	const balances = memberBalances.map((mb) => {
		if (sign * mb.balance >= 0) {
			return { ...mb, balance: 0 };
		}
		const balanceLeft = userBalance + mb.balance;
		userBalance = sign * Math.max(0, sign * balanceLeft);
		const memberBalance = sign * balanceLeft < 0 ? mb.balance - balanceLeft : mb.balance;
		return { ...mb, balance: memberBalance };
	});
	return balances;
}
