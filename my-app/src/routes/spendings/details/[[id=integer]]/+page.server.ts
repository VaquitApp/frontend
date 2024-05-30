import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { groupService, spendingService } from '$lib/server/api';
import type { PageServerLoad } from './$types';
import { fixDateString } from '$lib/formatter';

export const load: PageServerLoad = async ({ params, url, cookies }) => {
	const group_id = Number(url.searchParams.get('groupId'));
	const id = Number(params.id);
	// TODO: load real spending
	const spending: Spending = {
		id,
		description: '',
		amount: 0,
		owner_id: 0,
		date: new Date().toJSON().slice(0, 16),
		category_name: '',
		group_id
	};
	const groups: Group[] = await groupService.list(cookies);
	return { spending, groups };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const id = Number(params.id) || 0;
		const data = await request.formData();
		const description = data.get('description')?.toString();
		const amount = Number(data.get('amount'));
		const dateString = data.get('date')?.toString();
		const group_id = Number(data.get('groupId'));
		const category_name = data.get('categoryId')?.toString();

		if (!description) {
			throw error(400, 'Description is required');
		}
		if (Number.isNaN(amount)) {
			throw error(400, 'Amount is required');
		}
		if (!dateString) {
			throw error(400, 'Date is required');
		}

		const timezoneOffset = Number(data.get('timezoneOffset')) || 0;
		const date = fixDateString(dateString, timezoneOffset);
		const spending: Spending = { id, amount, description, date, group_id, category_name };
		try {
			await spendingService.save(spending, cookies);
		} catch {
			return { success: false };
		}

		redirect(302, `/groups/movements/${group_id}`);
	}
};
