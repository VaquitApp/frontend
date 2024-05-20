import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { groupService, spendingService } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, cookies }) => {
	const group_id = Number(url.searchParams.get('group_id'));
	const spending: Spending = {
		id: 0,
		description: '',
		amount: 0,
		date: new Date().toJSON(),
		group_id
	};
	const id = params.id;
	if (id) {
		// TODO: load real spending
	}
	const groups: Group[] = await groupService.list(cookies);
	return { spending, groups };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const id = Number(params.id) || 0;
		const data = await request.formData();
		const description = data.get('description')?.toString();
		const amount = Number(data.get('amount'));
		const date = data.get('date')?.toString();
		const group_id = Number(data.get('group_id'));

		if (!description) {
			throw error(400, 'Description is required');
		}
		if (Number.isNaN(amount)) {
			throw error(400, 'Amount is required');
		}
		if (!date) {
			throw error(400, 'Date is required');
		}

		const spending: Spending = { id, amount, description, date, group_id };
		try {
			await spendingService.save(spending, cookies);
		} catch {
			return { success: false };
		}

		redirect(302, `/groups/movements/${group_id}`);
	}
};
