import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';
type Headers = { [key: string]: string };
type Request = {
	path: string;
	data?: object;
	headers?: Headers;
};
type Opts = {
	method: Method;
	headers: Headers;
	body?: string;
};

const base = env.VITE_API_URL;

async function send(method: Method, { path, data, headers = {} }: Request) {
	const opts: Opts = { method, headers };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	const res = await fetch(`${base}/${path}`, opts);
	if (res.ok) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}

	throw error(res.status);
}

export function get(path: string, headers?: Headers) {
	return send('GET', { path, headers });
}

export function del(path: string, headers?: Headers) {
	return send('DELETE', { path, headers });
}

export function post(path: string, data: object, headers?: Headers) {
	return send('POST', { path, data, headers });
}

export function put(path: string, data: object, headers?: Headers) {
	return send('PUT', { path, data, headers });
}
