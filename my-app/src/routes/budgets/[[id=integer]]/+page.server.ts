import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { post } from '$lib/api';
import type { PageServerLoad } from './$types';
import { getAuthHeader } from '$lib/auth';

export const load: PageServerLoad = async ({ params }) => {
	let budget: Budget = { id: 0, amount: 0 };
	const id = params.id;
	if (id) {
		// TODO: load real budget
	}
	return { budget };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const data = await request.formData();
		const amount = data.get('amount');

		if (!amount) {
			throw error(400, 'Amount is required');
		}

		const headers = getAuthHeader(cookies);
		const path = ''; // TODO: Replace with real path
		const body = await post(path, { amount }, headers);

		const value = body.id;

		return { success: true };
	}
};
