import { env } from '@/env.mjs';
import { getSession } from '@/lib/auth';
import { ProfileInputSchema } from '@/lib/validations/profile';
import { Candidate } from '@/types';

const updateProfileFn = async (
	id: string,
	profile: Partial<ProfileInputSchema>
) => {
	try {
		const response = await fetch(`/api/profile/${id}`, {
			body: JSON.stringify(profile),
			method: 'PUT',
		});

		return await response.json();
	} catch (error) {
		throw new Error(error as any);
	}
};

const getCandidateProfile = async (id?: string): Promise<Candidate> => {
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
			config
		);

		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return res.json();
	} catch (error) {
		throw new Error(error as any);
	}
};

export { updateProfileFn, getCandidateProfile };
