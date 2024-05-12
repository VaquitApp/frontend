import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { post } from '$lib/api';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');

		if (!email) {
			throw error(400, 'Email is required');
		}

		const password = data.get('password');

		const body = await post('user/login', {
			email: email,
			password: password
		});

		if (body.errors) {
			throw fail(400, body);
		}

		// save JWT in cookie
		const value = body.id;
		cookies.set('jwt', value, { path: '/' });

		return { success: true };
	}
};
