import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { categoryService, groupService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, cookies }) => {
	const group_id = Number(url.searchParams.get('groupId')) || 0;
	const id = Number(params.id) || 0;
	const category: Category = id
		? await categoryService.get(id, cookies)
		: { id: 0, group_id, name: '', description: '', strategy: '' };
	const groups: Group[] = await groupService.list(cookies);
	return { category, groups };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const id = Number(params.id) || 0;
		const data = await request.formData();
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();
		const group_id = Number(data.get('groupId'));
		const strategy = '';

		if (!name) {
			throw error(400, 'Name is required');
		}
		if (!description) {
			throw error(400, 'Description is required');
		}
		if (!group_id) {
			throw error(400, 'Group is required');
		}

		const category: Category = { id, group_id, name, description, strategy };
		await categoryService.save(category, cookies);

		redirect(302, `/groups/movements/${group_id}`);
	}
};
