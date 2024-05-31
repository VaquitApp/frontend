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
	const categoryMap = new Map<number, number>(categories.map((category) => [category.id, 0]));
	spendings.forEach(({ amount, category_id }) => {
		const acc = categoryMap.get(category_id)!;
		categoryMap.set(category_id, acc + amount);
	});
	const labels = Array.from(categoryMap.keys()).map(
		(id) => categories.find((c) => c.id === id)!.name
	);
	const values = Array.from(categoryMap.values());
	return { labels, values };
}
