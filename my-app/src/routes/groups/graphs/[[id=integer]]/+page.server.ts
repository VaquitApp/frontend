import { categoryService, groupService, spendingService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const id = Number(params.id) || 0;
	const group: Group = id
		? await groupService.get(id, cookies)
		: { name: '', description: '', id: 0, owner_id: 0, is_archived: false };
	const categories = await categoryService.list(id, cookies);
	const spendings = await spendingService.list(id, cookies);
	const graphData = computePerCategorySpending(categories, spendings);
	return { group, graphData };
};

function computePerCategorySpending(categories: Category[], spendings: Spending[]) {
	const categoryMap = new Map<string, number>(categories.map((category) => [category.name, 0]));
	spendings.forEach(({ amount }) => {
		const randomChoice = Math.floor(Math.random() * categories.length);
		const categoryName = categories[randomChoice].name;
		const acc = categoryMap.get(categoryName)!;
		categoryMap.set(categoryName, acc + amount);
	});
	const labels = Array.from(categoryMap.keys());
	const values = Array.from(categoryMap.values());
	return { labels, values };
}
