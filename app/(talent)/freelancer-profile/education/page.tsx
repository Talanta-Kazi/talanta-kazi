import { notFound } from 'next/navigation';

import { getCandidateProfile } from '@/app/(talent)/actions';
import EducationForm from '@/app/(talent)/professional-profile/education/education-form';
import { Typography } from '@mui/material';

export default async function CandidateEducation() {
	const candidate = await getCandidateProfile();

	if (!candidate) {
		notFound();
	}

	const defaultValues = JSON.parse(candidate?.education as string);

	return (
		<>
			<Typography
				variant='h4'
				sx={{
					fontWeight: 700,
				}}
			>
				Education experience
			</Typography>
			<EducationForm defaultValues={defaultValues} />
		</>
	);
}
