import { type HeadersDefaults } from 'axios';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://127.0.0.1:8000';

type headers = {
	'Content-Type': string;
	Accept: string;
	Authorization: string;
};

// @ts-ignore
axiosClient.defaults.headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
} as headers & HeadersDefaults;

axiosClient.interceptors.request.use(
	async (config) => {
		const session = await getSession();

		if (session) {
			config.headers.common = {
				Authorization: `${session.user.token}`,
			};
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosClient;
