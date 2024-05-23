import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { groupService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const id = Number(params.id);
	let group: Group = { name: '', description: '', id: 0, owner_id: 0 };
	if (id !== undefined) {
		group = await groupService.get(id, cookies)
	}
	return { group };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		let id = Number(params.id) || 0;
		const data = await request.formData();
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();

		if (!name) {
			throw error(400, 'Name is required');
		}
		if (!description) {
			throw error(400, 'Description is required');
		}

		const group: Group = { id, name, description, owner_id: 0 };
		const body = await groupService.save(group, cookies);
		id = body.id;
		redirect(302, `/groups/movements/${id}`);
	}
};
