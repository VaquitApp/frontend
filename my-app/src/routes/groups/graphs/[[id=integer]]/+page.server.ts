import { formatDateString } from '$lib/formatter';
import { categoryService, groupService, spendingService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const id = Number(params.id) || 0;
	const group: Group = id
		? await groupService.get(id, cookies)
		: { name: '', description: '', id: 0, owner_id: 0, is_archived: false };
	const categories = await categoryService.list(id, cookies);
	const spendings = await spendingService.list(id, cookies);
	const graphData = computeGraphData(categories, spendings);
	return { group, graphData };
};

function computeSpendingsByCategory(categories: Category[], spendings: Spending[]) {
	const categoryMap = new Map<Id, Spending[]>(categories.map((category) => [category.id, []]));
	spendings.forEach((spending) => {
		const acc = categoryMap.get(spending.category_id)!;
		acc.push(spending);
	});
	return categoryMap;
}

function computeGraphData(categories: Category[], spendings: Spending[]) {
	const spendingsByCategory = computeSpendingsByCategory(categories, spendings);
	const labels = Array.from(spendingsByCategory.keys()).map(
		(id) => categories.find((c) => c.id === id)!.name
	);
	const values = Array.from(spendingsByCategory.values()).map((spendings) =>
		spendings.reduce((acc, s) => acc + s.amount, 0)
	);
	const spendingSumByCategory = { labels, values };

	const spendingsOverTime = computeSpendingsOverTime(categories, spendings, spendingsByCategory);
	return { spendingSumByCategory, spendingsOverTime };
}

function computeSpendingsOverTime(
	categories: Category[],
	spendings: Spending[],
	spendingsByCategory: Map<Id, Spending[]>
) {
	const globalSpendingsByDate = computeSpendingsByDate(spendings, new Map<string, number>());

	const emptySpendingsByDate = new Map<string, number>(
		Array.from(globalSpendingsByDate.entries()).map(([date, _]) => [date, 0])
	);

	let datasets = Array.from(spendingsByCategory.entries()).map(([id, spendings]) => {
		const label = categories.find((c) => c.id === id)!.name;
		const spendingsByDate = computeSpendingsByDate(
			spendings,
			new Map<string, number>(emptySpendingsByDate)
		);
		const sorted = [...spendingsByDate.entries()].sort(
			([d0, v0], [d1, v1]) => Date.parse(d0) - Date.parse(d1)
		);
		const data = sorted.map(([_, v]) => v);
		return { label, data };
	});
	const sorted = [...globalSpendingsByDate.entries()].sort(
		([d0, v0], [d1, v1]) => Date.parse(d0) - Date.parse(d1)
	);
	const data = sorted.map(([_, v]) => v);

	datasets.push({ label: 'Total', data });

	const labels = sorted.map(([d, _]) => d);

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
