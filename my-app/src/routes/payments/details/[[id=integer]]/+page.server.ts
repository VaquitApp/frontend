import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { groupService, paymentService } from '$lib/server/api';
import { getUserId } from '$lib/auth';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const groupId = url.searchParams.get('groupId') || '';
	// const id = Number(params.id) || 0;
	const groups: Group[] = await groupService.list(cookies);
	const userId = getUserId(cookies);
	return { userId, groupId, groups };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const id = Number(params.id) || 0;
		const data = await request.formData();

		const group_id = Number(data.get('groupId'));
		const to_id = Number(data.get('payeeId'));
		const from_id = getUserId(cookies);
		const amount = Number(data.get('amount'));

		if (!group_id) {
			throw error(400, 'Group is required');
		}

		const payment: Payment = { id, group_id, from_id, to_id, amount };
		await paymentService.save(payment, cookies);

		redirect(302, `/groups/movements/${group_id}`);
	}
};
