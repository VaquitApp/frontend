import { BUDGET_NEAR_LIMIT_THRESHOLD } from '$lib';

export function buildBalance(
	spendingsList: Spending[],
	budgetsList: Budget[],
	categories: Category[]
) {
	const categoryBalances = computeBalancesPerCategory(spendingsList, budgetsList, categories);

	const totalBudgets = categoryBalances.reduce((acc, { budgets }) => acc + budgets, 0);
	const totalSpendings = categoryBalances.reduce((acc, { spendings }) => acc + spendings, 0);
	const totalBalance = totalBudgets - totalSpendings;

	const overspentCategories = categoryBalances.filter(
		({ budgets, spendings }) => budgets < spendings
	);
	const isOverLimit = overspentCategories.length > 0;

	const nearlyOverspentCategories = categoryBalances.filter(
		({ budgets, spendings }) => spendings / budgets >= BUDGET_NEAR_LIMIT_THRESHOLD
	);
	const isNearLimit = nearlyOverspentCategories.length > 0;

	const balanceColor = isOverLimit ? '#da3633' : isNearLimit ? '#d29922' : null;
	const tooltipInfo = isOverLimit
		? `Presupuesto sobrepasado en categorías: ${formatCategoryList(overspentCategories)}`
		: isNearLimit
			? `Presupuesto cercano al límite en categorías: ${formatCategoryList(nearlyOverspentCategories)}`
			: '';

	return {
		totalBudgets,
		totalSpendings,
		totalBalance,
		overspentCategories,
		isOverLimit,
		nearlyOverspentCategories,
		isNearLimit,
		balanceColor,
		tooltipInfo
	};
}

export function computeBalancesPerCategory(
	spendingsList: Spending[],
	budgetsList: Budget[],
	categories: Category[]
): CategoryBalance[] {
	const balances = [];
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

function computeTotal(objects: { category_id: Id; amount: number }[], categoryId: Id): number {
	return objects
		.filter(({ category_id }) => category_id == categoryId)
		.reduce((acc, { amount }) => acc + amount, 0);
}

function formatCategoryList(categoryList: { categoryName: string }[]): string {
	return categoryList.map(({ categoryName }) => `"${categoryName}"`).join(', ');
}
