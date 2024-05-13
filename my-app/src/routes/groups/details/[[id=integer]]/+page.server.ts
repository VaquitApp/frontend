import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { post } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	let group: Group = { name: '', description: '', id: 0, owner_id: 0 };
	const id = params.id;
	if (id) {
		// TODO: load real group
	}
	return { group };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const data = await request.formData();
		const name = data.get('name');
		const description = data.get('description');

		if (!name) {
			throw error(400, 'Name is required');
		}
		if (!description) {
			throw error(400, 'Description is required');
		}

		const token = cookies.get('jwt')!;
		const body = await post('group', { name, description }, { 'x-user': token });

		if (body.errors) {
			throw fail(400, body);
		}

		const value = body.id;

		return { success: true };
	}
};
