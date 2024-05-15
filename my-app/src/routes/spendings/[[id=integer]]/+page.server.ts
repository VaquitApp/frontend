import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { get, post } from '$lib/api';
import type { PageServerLoad } from './$types';
import { getAuthHeader } from '$lib/auth';

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
	const groups: Group[] = await get('group', getAuthHeader(cookies));
	return { spending, groups };
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const description = data.get('description');
		const amount = data.get('amount');
		const group_id = data.get('group_id');

		if (!description) {
			throw error(400, 'Description is required');
		}

		if (!amount) {
			throw error(400, 'Amount is required');
		}

		const headers = getAuthHeader(cookies);
		try {
			await post('spending', { description, amount, group_id }, headers);
		} catch {
			return { success: false };
		}

		redirect(302, `/groups/movements/${group_id}`);
	}
};
