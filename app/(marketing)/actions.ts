import { env } from '@/env.mjs';
import { ContractType, Job } from '@/types';

export const getJobs = async (): Promise<Array<Job>> => {
	const res = await fetch(`${env.API_URL}/jobs/`);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
};

export const getContractTypes = async (): Promise<Array<ContractType>> => {
	const res = await fetch(`${env.API_URL}/jobs/list-contract-types/`);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
};

export const getJobById = async (id: string): Promise<Job> => {
	const res = await fetch(`${env.API_URL}/jobs/${id}/`);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
};

export const getSpecialisms = async (): Promise<Array<string>> => {
	const res = await fetch(`${env.API_URL}/jobs/list-specialism/`);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
};
