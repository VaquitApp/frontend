export function computeBalance(
	spendingsList: Spending[],
	budgetsList: Budget[],
	categories: Category[]
): { spendings: number; budgets: number } {
	const balances = computeBalancesPerCategory(spendingsList, budgetsList, categories);
	return {
		budgets: sum(balances.map((b) => b.budgets)),
		spendings: sum(balances.map((b) => b.spendings))
	};
}

export function computeBalancesPerCategory(
	spendingsList: Spending[],
	budgetsList: Budget[],
	categories: Category[]
) {
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

function computeTotal(objects: { category_id: Id; amount: number }[], categoryId: Id) {
	return sum(objects.filter(({ category_id }) => category_id == categoryId).map((o) => o.amount));
}

function sum(numbers: number[]): number {
	return numbers.reduce((acc, amount) => acc + amount, 0);
}
