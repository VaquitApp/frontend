import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import { categoryService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const category: Category = { id: 0, name: '' };
	const id = params.id;
	if (id) {
		// TODO: load real category
	}
	return { category };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const id = Number(params.id) || 0;
		const data = await request.formData();
		const name = data.get('name')?.toString();

		if (!name) {
			throw error(400, 'Name is required');
		}

		const category: Category = { id, name };
		await categoryService.save(category, cookies);
		return { success: true };
	}
};
