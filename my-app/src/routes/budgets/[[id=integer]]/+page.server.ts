import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { budgetService } from '$lib/server/api';

export const load: PageServerLoad = async ({ params, url, cookies }) => {
	const group_id = Number(url.searchParams.get('group_id'));
	const id = Number(params.id) || 0;
	if (id) {
		const budget = await budgetService.get(id, cookies);
		return { editing: true, budget };
	}
	return { editing: false, budget: { group_id } };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const id = Number(params.id) || 0;
		const data = await request.formData();
		const description = data.get('description')?.toString();
		const amount = Number(data.get('amount'));
		const start_date = new Date().toJSON();
		const end_date = new Date().toJSON();
		const category_id = 1;
		const group_id = 1;

		if (!description) {
			throw error(400, 'Description is required');
		}
		if (Number.isNaN(amount)) {
			throw error(400, 'Amount is required');
		}
		const budget: Budget = { id, description, amount, start_date, end_date, category_id, group_id };
		await budgetService.save(budget, cookies);
		redirect(302, `/groups/budgets/${group_id}`);
	}
};
