import { budgetService, categoryService, spendingService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const id = Number(params.id);
	const spendings: Spending[] = await spendingService.list(id, cookies);
	const budgets: Budget[] = await budgetService.list(id, cookies);
	const categories: Category[] = await categoryService.list(id, cookies);
	return { spendings, budgets, categories };
};
