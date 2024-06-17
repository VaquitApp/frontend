import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { groupService, paymentService } from '$lib/server/api';
import { getUserId } from '$lib/auth';
import { routes } from '$lib';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const groupId = Number(url.searchParams.get('groupId')) || 0;
	const groups: Group[] = await groupService.list(cookies);
	return { groupId, groups };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const id = Number(params.id) || 0;
		const data = await request.formData();

		const group_id = Number(data.get('groupId'));
		const to_id = Number(data.get('payeeId'));
		const from_id = getUserId(cookies)!;
		const amount = Number(data.get('amount'));
		const date = new Date().toJSON();

		if (!group_id) {
			throw error(400, 'Group is required');
		}

		const payment = { id, group_id, from_id, to_id, amount, date };
		await paymentService.save(payment, cookies);

		redirect(302, routes.groupMovements(group_id));
	}
};
