import { notFound } from 'next/navigation';

import WorkForm from '@/app/(talent)/_components/work-form';
import { getCandidateProfile } from '@/app/(talent)/actions';
import { Typography } from '@mui/material';

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
				Add your work experience
			</Typography>
			<WorkForm candidate={candidate} />
		</>
	);
}
