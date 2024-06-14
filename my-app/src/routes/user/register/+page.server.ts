import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { saveUserCredentials } from '$lib/auth';
import { userService } from '$lib/server/api';
import { routes } from '$lib';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password1')?.toString();
		const password2 = data.get('password2')?.toString();

		if (!email) {
			throw error(400, 'Email is required');
		}
		if (!password) {
			throw error(400, 'Password is required');
		}
		if (password !== password2) {
			throw error(400, 'Passwords do not match');
		}

		const body = await userService.register({ email, password });
		saveUserCredentials(cookies, body);
		return redirect(302, routes.groups);
	}
};
