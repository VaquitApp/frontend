import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { post } from '$lib/api';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');

		if (!email) {
			throw error(400, 'Email is required');
		}

		const password = data.get('password1');

		if (password !== data.get('password2')) {
			throw error(400, 'Passwords do not match');
		}

		const body = await post('user/register', {
			email: email,
			password: password
		});

		// save JWT in cookie
		const value = body.id;
		cookies.set('jwt', value, { path: '/' });

		return redirect(302, '/groups');
	}
};
