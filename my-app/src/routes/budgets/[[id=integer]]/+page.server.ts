import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import { budgetService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const budget: Budget = { id: 0, amount: 0 };
	const id = params.id;
	if (id) {
		// TODO: load real budget
	}
	return { budget };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const id = Number(params.id) || 0;
		const data = await request.formData();
		const amount = Number(data.get('amount'));

		if (!Number.isNaN(amount)) {
			throw error(400, 'Amount is required');
		}

		const budget: Budget = { id, amount };
		await budgetService.save(budget, cookies);
		return { success: true };
	}
};
