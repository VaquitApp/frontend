import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { post } from '$lib/api';
import type { PageServerLoad } from './$types';
import { getAuthHeader } from '$lib/auth';

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

		const headers = getAuthHeader(cookies);
		const path = ''; // TODO: replace with real path
		const body = await post(path, { name }, headers);

		const value = body.id;

		return { success: true };
	}
};
