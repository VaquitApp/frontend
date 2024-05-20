import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { budgetService, groupService } from '$lib/server/api';
import { fixDateString } from '$lib/formatter';

export const load: PageServerLoad = async ({ params, url, cookies }) => {
	const group_id = Number(url.searchParams.get('group_id'));
	const id = Number(params.id) || 0;
	let budget: Budget = {
		id,
		amount: 0,
		description: '',
		start_date: '',
		end_date: '',
		category_id: 0,
		group_id
	};
	if (id) {
		budget = await budgetService.get(id, cookies);
	}
	const groups: Group[] = await groupService.list(cookies);
	return { budget, groups };
};

export const actions: Actions = {
	default: async ({ cookies, request, params }) => {
		const id = Number(params.id) || 0;
		const data = await request.formData();
		const description = data.get('description')?.toString();
		const amount = Number(data.get('amount'));
		const startDateString = data.get('startDate')?.toString();
		const endDateString = data.get('endDate')?.toString();
		const category_id = Number(data.get('categoryId'));
		const group_id = Number(data.get('groupId'));
		const timezoneOffset = Number(data.get('timezoneOffset')) || 0;

		if (!description) {
			throw error(400, 'Description is required');
		}
		if (Number.isNaN(amount)) {
			throw error(400, 'Amount is required');
		}
		if (!startDateString) {
			throw error(400, 'Start date is required');
		}
		if (!endDateString) {
			throw error(400, 'End date is required');
		}

		const budget: Budget = {
			id,
			description,
			amount,
			start_date: fixDateString(startDateString, timezoneOffset),
			end_date: fixDateString(endDateString, timezoneOffset),
			category_id,
			group_id
		};
		await budgetService.save(budget, cookies);
		redirect(302, `/groups/budgets/${group_id}`);
	}
};
