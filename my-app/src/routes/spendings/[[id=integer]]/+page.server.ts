import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { post } from '$lib/api';
import type { PageServerLoad } from './$types';

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

		const token = cookies.get('jwt')!;
		const path = ''; // TODO: replace with real path
		const body = await post(path, { description, amount }, { 'x-user': token });

		if (body.errors) {
			throw fail(400, body);
		}

		const value = body.id;

		return { success: true };
	}
};
