import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { post } from '$lib/api';
import type { PageServerLoad } from './$types';
import { getAuthHeader } from '$lib/auth';

export const load: PageServerLoad = async ({ params, url, cookies }) => {
	const group_id = Number(url.searchParams.get('group_id'));
	let budget: Budget = { id: 0, amount: 0, group_id: group_id };
	const id = params.id;
	if (id) {
		// TODO: load real budget
	}
	return { budget };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const data = await request.formData();
		const description = data.get('description');
		const amount = data.get('amount');
		const start_date = new Date();
		const end_date = new Date();
		const category_id = 1;
		const group_id = 1;

		if (!amount) {
			throw error(400, 'Amount is required');
		}
		const budget = { description, amount, start_date, end_date, category_id, group_id };

		const headers = getAuthHeader(cookies);
		const path = 'budget';
		const body = await post(path, budget, headers);

		throw redirect('/groups');
	}
};
