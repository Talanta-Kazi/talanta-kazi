import { env } from '@/env.mjs';
import { cache } from 'react';

export const getJobs = cache(async () => {
	const res = await fetch(`${env.API_URL}/jobs/`);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
});

export const getContractTypes = cache(async () => {
	const res = await fetch(`${env.API_URL}/jobs/list-contract-types/`);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
});
