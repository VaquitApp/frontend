import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { categoryService, groupService } from '$lib/server/api';
import type { PageServerLoad } from './$types';
import { routes, strategies } from '$lib';

export const load: PageServerLoad = async ({ params, url, cookies }) => {
	const group_id = Number(url.searchParams.get('groupId')) || 0;
	const id = Number(params.id) || 0;
	const category: Category = id
		? await categoryService.get(id, cookies)
		: { id: 0, group_id, name: '', description: '', strategy: 'equalparts' };
	const groups: Group[] = await groupService.list(cookies);
	return { category, groups };
};

export const actions: Actions = {
	update: async ({ cookies, request, params }) => {
		const id = Number(params.id) || 0;
		const data = await request.formData();
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();
		const group_id = Number(data.get('groupId'));
		const strategyData = data.get('stategy')?.toString();

		if (!name) {
			throw error(400, 'Name is required');
		}
		if (!description) {
			throw error(400, 'Description is required');
		}
		if (!group_id) {
			throw error(400, 'Group is required');
		}
		if (!strategyData || !Object.keys(strategies).includes(strategyData)) {
			throw error(400, 'Strategy is required');
		}

		const strategy = strategyData as Strategy;

		const category: Category = { id, group_id, name, description, strategy };
		await categoryService.save(category, cookies);

		redirect(302, routes.groupMovements(group_id));
	},
	archive: async ({ cookies, params }) => {
		const id = Number(params.id) || 0;
		await categoryService.archive(id, cookies);
	},
	unarchive: async ({ cookies, params }) => {
		const id = Number(params.id) || 0;
		await categoryService.unarchive(id, cookies);
	}
};
