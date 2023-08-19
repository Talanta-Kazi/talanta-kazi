import { notFound } from 'next/navigation';

import { getCandidateProfile } from '@/app/(talent)/actions';
import PersonalForm from '@/app/(talent)/professional-profile/personal/personal-form';
import { Typography } from '@mui/material';

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
				Tell us more about yourself.
			</Typography>
			<PersonalForm candidate={candidate} />
		</>
	);
}
