import { getCandidateProfile } from '@/app/(candidate)/actions';
import { notFound } from 'next/navigation';
import { Typography } from '@mui/material';
import WorkForm from '@/app/(candidate)/create-profile/work/work-form';

export default async function CandidateEducation() {
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
				What work would you want to do with us?
			</Typography>
			<WorkForm candidate={candidate} />
		</>
	);
}
