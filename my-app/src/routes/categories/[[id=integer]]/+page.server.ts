import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { post } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	let category: Category = { id: 0, name: '' };
	const id = params.id;
	if (id) {
		// TODO: load real category
	}
	return { category };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const data = await request.formData();
		const name = data.get('name');

		if (!name) {
			throw error(400, 'Name is required');
		}

		const token = cookies.get('jwt')!;
		const path = ''; // TODO: replace with real path
		const body = await post(path, { name }, { 'x-user': token });

		if (body.errors) {
			throw fail(400, body);
		}

		const value = body.id;

		return { success: true };
	}
};
