import { budgetService, categoryService, groupService, paymentService, spendingService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const id = Number(params.id);
	const group: Group = await groupService.get(id, cookies);
	const spendings: Spending[] = await spendingService.list(id, cookies);
	const budgets: Budget[] = await budgetService.list(id, cookies);
	const categories: Category[] = await categoryService.list(id, cookies);
	const payments: Payment[] = await paymentService.list(id, cookies);
	const members: User[] = await groupService.listAllMembers(id, cookies);

	const categoryBalances: CategoryBalance[] = computeBalancesPerCategory(
		spendings,
		budgets,
		categories
	);
	return { group, spendings, payments, budgets, categories, members, categoryBalances };
};

function computeBalancesPerCategory(
	spendingsList: Spending[],
	budgetsList: Budget[],
	categories: Category[]
) {
	var balances = [];
	for (const category of categories) {
		const spendings = computeTotal(spendingsList, category.id);
		const budgets = computeTotal(budgetsList, category.id);
		const balance = {
			categoryId: category.id,
			categoryName: category.name,
			categoryDescription: category.description,
			budgets,
			spendings
		};
		balances.push(balance);
	}
	return balances;
}

function computeTotal(objects: { category_id: Id; amount: number }[], categoryId: Id) {
	return objects
		.filter(({ category_id }) => category_id == categoryId)
		.reduce((acc, { amount }) => acc + amount, 0);
}
