import { paymentService, groupService } from '$lib/server/api';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { routes } from '$lib';
import { getUserId } from '$lib/auth';

export const load: PageServerLoad = async ({ params, url, cookies }) => {
	const paymentId = params.id || 0;
	const group_id = Number(url.searchParams.get('groupId'));
	const group = await groupService.get(group_id, cookies);

	const payments: Payment[] = await paymentService.list(group_id, cookies);
	const currentPayment: Payment = payments.filter((p) => p.id == paymentId)[0];

	const members: User[] = await groupService.listAllMembers(group_id, cookies);
	const currentUserId = getUserId(cookies);

	return { currentPayment, members, currentUserId, group };
};

export const actions: Actions = {
	default: async ({ cookies, request, params, url }) => {
		const group_id = Number(url.searchParams.get('groupId'));
		const paymentId = Number(params.id);

		if (!paymentId) {
			throw error(400, 'Payment ID is required');
		}

		if (!group_id) {
			throw error(400, 'Group ID is required');
		}

		await paymentService.confirm(paymentId, cookies);
		redirect(302, routes.groupMovements(group_id));
	}
};
