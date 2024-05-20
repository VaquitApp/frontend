import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { userService } from '$lib/server/api';
import { saveUserCredentials } from '$lib/auth';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email) {
			throw error(400, 'Email is required');
		}
		if (!password) {
			throw error(400, 'Password is required');
		}

		const body = await userService.login({ email, password });
		saveUserCredentials(cookies, body);
		return redirect(302, '/groups');
	}
};
