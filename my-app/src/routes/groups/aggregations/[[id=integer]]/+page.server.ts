import { categoryService, groupService, spendingService } from '$lib/server/api';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const id = Number(params.id) || 0;
	const group: Group = await groupService.get(id, cookies);
	const categories: Category[] = await categoryService.list(id, cookies);
	return { group, categories };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const id = Number(params.id) || 0;

		const data = await request.formData();
		const dateIni = new Date(data.get('dateIni') as string);
		const dateFin = new Date(data.get('dateFin') as string);
		
		const spendings: Spending[] = await spendingService.list(id, cookies);

        const filteredSpendings = spendings.filter((spending: Spending) => {
			const spendingDate = new Date(spending.date.slice(0,10)); //removing timezone
			return spendingDate >= dateIni && spendingDate <= dateFin;
		});

		const totalSum = filteredSpendings.reduce((sum: number, spending: Spending) => sum + spending.amount, 0);

        const sumPerCategory = filteredSpendings.reduce((acc: { [x: number]: number; }, spending: Spending) => {
			acc[spending.category_id] = (acc[spending.category_id] || 0) + spending.amount;
			return acc;
		}, {});

        return {
			totalSum,
			sumPerCategory
		};
	}
};
