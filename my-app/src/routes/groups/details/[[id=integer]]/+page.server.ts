import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { categoryService, groupService } from '$lib/server/api';
import type { PageServerLoad } from './$types';
import { routes } from '$lib';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const id = Number(params.id) || 0;
	const group: Group = id
		? await groupService.get(id, cookies)
		: { name: '', description: '', id: 0, owner_id: 0, is_archived: false };
	return { group };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		let id = Number(params.id) || 0;
		const isNew = id === 0;
		const data = await request.formData();
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();

		if (!name) {
			throw error(400, 'Name is required');
		}
		if (!description) {
			throw error(400, 'Description is required');
		}

		const group: Group = { id, name, description, owner_id: 0, is_archived: false };
		const body = await groupService.save(group, cookies);
		id = body.id;

		if (isNew) {
			await categoryService.save(
				{
					id: 0,
					group_id: id,
					name: 'Sin categorizar',
					description: '',
					strategy: 'equalparts'
				},
				cookies
			);
		}

		redirect(302, routes.groupMovements(id));
	}
};
