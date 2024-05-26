import type { Cookies } from '@sveltejs/kit';

type UserCredentials = {
	id: number;
	email: string;
	jwt: string;
};

export function saveUserCredentials(cookies: Cookies, userCredentials: UserCredentials) {
	cookies.set('jwt', userCredentials.jwt, { httpOnly: true, secure: true, path: '/' });
	cookies.set('userId', userCredentials.id.toFixed(0), { path: '/' });
	cookies.set('userEmail', userCredentials.email, { path: '/' });
}

export function clearUserCredentials(cookies: Cookies) {
	cookies.delete('jwt', { path: '/' });
	cookies.delete('userId', { path: '/' });
	cookies.delete('userEmail', { path: '/' });
}

export function getAuthHeader(cookies: Cookies) {
	const token = cookies.get('jwt')!;
	return { 'x-user': token };
}

export function getUserId(cookies: Cookies) {
	return Number(cookies.get('userId'));
}

export function getUserEmail(cookies: Cookies) {
	return cookies.get('userEmail');
}
