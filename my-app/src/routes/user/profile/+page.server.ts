import { userService } from '$lib/server/api';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	{
		const profile: UserProfile = {
			cbu: cookies.get('cbu')!,
			alias: cookies.get('cbu')!,
			has_google: false
		};
		return { profile };
	}
	const profile: UserProfile = await userService.getMe(cookies);
	return { profile };
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const cbu = data.get('cbu')?.toString() || '';
		const alias = data.get('alias')?.toString() || '';

		const profile: UserProfile = { cbu, alias };
		try {
			await userService.save(profile, cookies);
		} catch {
			return { success: false };
		}

		return { success: true };
	}
};
