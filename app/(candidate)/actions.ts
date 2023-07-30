import { apiClient } from '@/lib/api';
import { ProfileInputSchema } from '@/lib/validations/profile';
import { Candidate } from '@/types';
import { cache } from 'react';
import { env } from '@/env.mjs';
import { getSession } from '@/lib/auth';

const updateProfileFn = async (profile: Partial<ProfileInputSchema>) => {
	const response = await apiClient.put<Candidate>('/api/profile', profile);
	return response.data;
};

const getCandidateProfile = cache(async (id?: string): Promise<Candidate> => {
	const session = await getSession();
	if (!session) {
		throw new Error('Unauthorized');
	}

	const config = {
		headers: {
			Authorization: `Bearer ${session?.user?.token}`,
		},
	};

	const userId = id || session?.user?.id;

	try {
		const res = await fetch(
			`${env.API_URL}/candidate/profile/${userId}`,
			config,
		);

		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return res.json();
	} catch (error) {
		throw new Error(error as any);
	}
});

export { updateProfileFn, getCandidateProfile };
