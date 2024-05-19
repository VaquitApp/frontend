import type { Cookies } from '@sveltejs/kit';

export function saveUserCredentials(cookies: Cookies, userId: number) {
	// TODO: save user info in another cookie
	cookies.set('jwt', userId.toFixed(0), { httpOnly: true, secure: true, path: '/' });
}

export function getAuthHeader(cookies: Cookies) {
	const token = cookies.get('jwt')!;
	return { 'x-user': token };
}
