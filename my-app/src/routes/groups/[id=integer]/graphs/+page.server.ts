import { budgetService, categoryService, spendingService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const id = Number(params.id);
	const categories: Category[] = await categoryService.list(id, cookies);
	const spendings: Spending[] = await spendingService.list(id, cookies);
	const budgets: Budget[] = await budgetService.list(id, cookies);
	return { id, budgets, categories, spendings };
};
