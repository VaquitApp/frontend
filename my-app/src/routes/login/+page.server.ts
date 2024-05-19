import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { post } from '$lib/api';
import { saveUserCredentials } from '$lib/auth';

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

		saveUserCredentials(cookies, body);
		return redirect(302, '/groups');
	}
};
