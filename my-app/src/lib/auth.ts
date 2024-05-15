import type { Cookies } from '@sveltejs/kit';

export function getAuthHeader(cookies: Cookies) {
	const token = cookies.get('jwt')!;
	return { 'x-user': token };
}
