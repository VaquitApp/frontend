import { error } from '@sveltejs/kit';

type Request = {
	method: 'GET' | 'POST' | 'DELETE' | 'PUT';
	path: string;
	data?: object;
	token?: string;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function send({ method, path, data, token }: Request) {
	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Token ${token}`;
	}

	const url = `${BACKEND_URL}/${path}`;
	const res = await fetch(url, opts);
	if (res.ok) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}

	throw error(res.status);
}

export function get(path: string, token?: string) {
	return send({ method: 'GET', path, token });
}

export function del(path: string, token?: string) {
	return send({ method: 'DELETE', path, token });
}

export function post(path: string, data: object, token?: string) {
	return send({ method: 'POST', path, data, token });
}

export function put(path: string, data: object, token?: string) {
	return send({ method: 'PUT', path, data, token });
}
