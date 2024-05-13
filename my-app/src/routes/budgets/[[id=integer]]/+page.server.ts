import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { post } from '$lib/api';
import type { PageServerLoad } from './$types';

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

		const token = cookies.get('jwt')!;
		const path = ''; // TODO: Replace with real path
		const body = await post(path, { amount }, { 'x-user': token });

		if (body.errors) {
			throw fail(400, body);
		}

		const value = body.id;

		return { success: true };
	}
};
