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

export const getSpecialisms = async (
	specialismType?: 'Professionals' | 'Freelancers' | 'Consultants',
): Promise<Array<string>> => {
	const res = await fetch(
		`${env.API_URL}/jobs/list-specialism/?type=${specialismType}`,
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	const specialisms = await res.json();

	// if (specialismType) {
	// 	return specialisms.filter((specialism: { type: string }) => {
	// 		return specialism.type === specialismType;
	// 	});
	// }

	return specialisms;
};
