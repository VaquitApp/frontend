import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { get, post, put } from '$lib/api';
import type { PageServerLoad } from './$types';
import { getAuthHeader } from '$lib/auth';

export const load: PageServerLoad = async ({ params, url, cookies }) => {
	const group_id = Number(url.searchParams.get('group_id'));
	const id = params.id;
	if (id) {
		const budget = await get(`budget/${id}`, getAuthHeader(cookies));
		return { editing: true, budget };
	}
	return { editing: false, budget: { group_id } };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const id = params.id;
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
		if (id) {
			await put(`${path}/${id}`, { id, ...budget }, headers);
		} else {
			await post(path, budget, headers);
		}

		throw redirect(302, `/groups/budgets/${group_id}`);
	}
};
