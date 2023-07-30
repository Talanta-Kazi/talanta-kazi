import Container from '@/components/container';
import { Typography } from '@mui/material';
import { profileValidationSchema } from '@/lib/validations/profile';
import type * as z from 'zod';
import { getCandidateProfile } from '@/app/(candidate)/actions';
import CandidateTitleForm from '@/app/(candidate)/create-profile/title/candidate-title-form';
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
		<Container maxWidth={720}>
			<Typography
				variant='h4'
				sx={{
					fontWeight: 700,
				}}
			>
				Tell us about yourself.
			</Typography>
			<CandidateTitleForm candidate={candidate} />
		</Container>
	);
}
