import {
	budgetService,
	categoryService,
	groupService,
	paymentService,
	spendingService
} from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const id = Number(params.id);
	const group: Group = await groupService.get(id, cookies);
	const spendings: Spending[] = await spendingService.list(id, cookies);
	const budgets: Budget[] = await budgetService.list(id, cookies);
	const categories: Category[] = await categoryService.list(id, cookies);
	const payments: Payment[] = await paymentService.list(id, cookies);
	const members: User[] = await groupService.listAllMembers(id, cookies);
	return { group, spendings, payments, budgets, categories, members };
};
