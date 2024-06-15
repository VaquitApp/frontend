import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { groupService, spendingService } from '$lib/server/api';
import type { PageServerLoad } from './$types';
import { fixDateString } from '$lib/formatter';
import { getUserId } from '$lib/auth';
import { routes } from '$lib';
import { spendingType } from './spending-utils';

export const load: PageServerLoad = async ({ params, url, cookies }) => {
	const group_id = Number(url.searchParams.get('groupId'));
	const id = Number(params.id) || 0;
	const spending: UniqueSpending = {
		id,
		description: '',
		amount: 0,
		owner_id: 0,
		date: new Date().toJSON(),
		category_id: 0,
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
		const category_id = Number(data.get('categoryId'));
		const owner_id = getUserId(cookies)!;
		const type = Number(data.get('type'));
		const amount_of_installments = Number(data.get('amountOfInstallments'));

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
		const spending: Spending = {
			id,
			amount,
			description,
			date,
			group_id,
			category_id,
			owner_id
		};

		try {
			await (type === spendingType.unique
				? spendingService.saveUniqueSpending(spending, cookies)
				: type === spendingType.installment
					? spendingService.saveInstallmentSpending(
							{ ...spending, amount_of_installments },
							cookies
						)
					: spendingService.saveRecurringSpending(spending, cookies));
		} catch {
			return { success: false };
		}

		redirect(302, routes.groupMovements(group_id));
	}
};
