import { budgetService, categoryService, groupService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const id = Number(params.id);
	const group: Group = await groupService.get(id, cookies);
	const budgets: Budget[] = await budgetService.list(id, cookies);
	const categories: Category[] = await categoryService.list(id, cookies);
	return { group, budgets, categories };
};
