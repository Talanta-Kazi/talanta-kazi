import { getCandidateProfile } from '@/app/(candidate)/actions';
import { notFound } from 'next/navigation';
import { Typography } from '@mui/material';
import EducationForm from '@/app/(candidate)/create-profile/education/education-form';

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
				Education experience
			</Typography>
			<EducationForm candidate={candidate} />
		</>
	);
}
