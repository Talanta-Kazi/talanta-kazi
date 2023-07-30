import { Typography } from '@mui/material';
import { profileValidationSchema } from '@/lib/validations/profile';
import type * as z from 'zod';
import { getCandidateProfile } from '@/app/(candidate)/actions';
import TitleForm from '@/app/(candidate)/create-profile/title/title-form';
import { notFound } from 'next/navigation';

export type CreateProfileTitleInputSchema = Pick<
	z.infer<typeof profileValidationSchema>,
	'job_title' | 'country' | 'website'
>;

export default async function CandidateTitle() {
	const candidate = await getCandidateProfile();

	if (!candidate) {
		notFound();
	}

	return (
		<>
			<Typography
				variant='h4'
				sx={{
					fontWeight: 700,
				}}
			>
				Tell us about yourself.
			</Typography>
			<TitleForm candidate={candidate} />
		</>
	);
}
