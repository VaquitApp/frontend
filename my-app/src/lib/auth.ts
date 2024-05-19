import type { Cookies } from '@sveltejs/kit';

type UserCredentials = {
	id: number;
	email: string;
	jwt: string;
};

export function saveUserCredentials(cookies: Cookies, userCredentials: UserCredentials) {
	// TODO: save user info in another cookie
	cookies.set('jwt', userCredentials.jwt, { httpOnly: true, secure: true, path: '/' });
	cookies.set('userId', userCredentials.id.toFixed(0), { path: '/' });
	cookies.set('userEmail', userCredentials.email, { path: '/' });
}

export function getAuthHeader(cookies: Cookies) {
	const token = cookies.get('jwt')!;
	return { 'x-user': token };
}

export function getUserEmail(cookies: Cookies) {
	return cookies.get('userEmail');
}
