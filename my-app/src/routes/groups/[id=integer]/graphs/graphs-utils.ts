import { formatDateString } from '$lib/formatter';

type InputData = {
	categories: Category[];
	spendings: Spending[];
	budgets: Budget[];
};

type Filters = {
	since: Date;
	upto: Date;
};

export type GraphData = ReturnType<typeof computeGraphData>;

export function computeGraphDataWithFilters(data: InputData, filters: Filters) {
	let { since, upto } = filters;
	let { categories, spendings, budgets } = data;

	// include up to date
	upto = new Date(upto.getTime() + 24 * 60 * 60 * 1000);

	spendings = spendings.filter((s) => {
		const date = new Date(s.date);
		return since <= date && date <= upto;
	});
	categories = categories.filter((c) => spendings.some((s) => s.category_id === c.id));

	return computeGraphData(categories, spendings, budgets);
}

function computeGraphData(categories: Category[], spendings: Spending[], budgets: Budget[]) {
	const spendingsByCategory = computeSpendingsByCategory(categories, spendings);
	const labels = Array.from(spendingsByCategory.keys()).map(
		(id) => categories.find((c) => c.id === id)!.name
	);
	const values = Array.from(spendingsByCategory.values()).map((spendings) =>
		spendings.reduce((acc, s) => acc + s.amount, 0)
	);
	const spendingSumByCategory = { labels, values };

	const spendingsOverTime = computeSpendingsOverTime(categories, spendings, spendingsByCategory);
	const balanceOverTime = computeBalanceOverTime(spendings, budgets);
	return { spendingSumByCategory, spendingsOverTime, balanceOverTime };
}

function computeSpendingsByCategory(categories: Category[], spendings: Spending[]) {
	const categoryMap = new Map<Id, Spending[]>(categories.map((category) => [category.id, []]));
	spendings.forEach((spending) => {
		const acc = categoryMap.get(spending.category_id)!;
		acc.push(spending);
	});
	return categoryMap;
}

function computeSpendingsOverTime(
	categories: Category[],
	spendings: Spending[],
	spendingsByCategory: Map<Id, Spending[]>
) {
	const globalSpendingsByDate = computeSpendingsByDate(spendings, new Map<string, number>());

	const emptySpendingsByDate = new Map<string, number>(
		Array.from(globalSpendingsByDate.entries()).map(([date]) => [date, 0])
	);

	const datasets = Array.from(spendingsByCategory.entries()).map(([id, spendings]) => {
		const label = categories.find((c) => c.id === id)!.name;
		const spendingsByDate = computeSpendingsByDate(
			spendings,
			new Map<string, number>(emptySpendingsByDate)
		);
		const sorted = [...spendingsByDate.entries()].sort(sortDateTuples);
		const data = sorted.map(([, v]) => v);
		return { label, data };
	});
	const sorted = [...globalSpendingsByDate.entries()].sort(sortDateTuples);
	const data = sorted.map(([, v]) => v);

	datasets.push({ label: 'Total', data });

	const labels = sorted.map(([d]) => d);

	return { labels, datasets };
}

function computeSpendingsByDate(spendings: Spending[], spendingsByDate: Map<string, number>) {
	spendings.forEach((spending) => {
		const date = formatDateString(spending.date);
		const acc = spendingsByDate.get(date) || 0;
		spendingsByDate.set(date, acc + spending.amount);
	});
	return spendingsByDate;
}

function sortDateTuples([date0]: [string, unknown], [date1]: [string, unknown]) {
	return sortDates(date0, date1);
}

function sortDates(date0: string, date1: string) {
	return Date.parse(date0) - Date.parse(date1);
}

function computeBalanceOverTime(spendings: Spending[], budgets: Budget[]) {
	// TODO: split this by category
	const spendingsByDate = computeSpendingsByDate(spendings, new Map<string, number>());
	const totalBudget = budgets.reduce((acc, b) => acc + b.amount, 0);

	let acc = 0;
	const balanceByDate = [...spendingsByDate.entries()]
		.sort(sortDateTuples)
		.map(([date, spendingAmount]) => {
			acc += spendingAmount;
			return [date, totalBudget - acc];
		});

	const data = balanceByDate.map(([, balance]) => balance);
	const datasets = [{ label: 'Total', data }];
	const labels = balanceByDate.map(([date]) => date);

	return { labels, datasets };
}
