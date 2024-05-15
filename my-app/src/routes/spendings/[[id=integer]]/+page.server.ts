import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { post } from '$lib/api';
import type { PageServerLoad } from './$types';
import { getAuthHeader } from '$lib/auth';

export const load: PageServerLoad = async ({ params }) => {
	let spending: Spending = { id: 0, description: '', amount: 0 };
	const id = params.id;
	if (id) {
		// TODO: load real spending
	}
	return { spending };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const data = await request.formData();
		const description = data.get('description');
		const amount = data.get('amount');

		if (!description) {
			throw error(400, 'Description is required');
		}

		if (!amount) {
			throw error(400, 'Amount is required');
		}

		const headers = getAuthHeader(cookies);
		// TODO: include real group ID
		const group_id = 1;
		const body = await post('spending', { description, amount, group_id }, headers);

		const value = body.id;

		return { success: true };
	}
};
