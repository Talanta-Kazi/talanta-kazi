import { notFound } from 'next/navigation';

import { getSpecialisms } from '@/app/(marketing)/actions';
import { getCandidateProfile } from '@/app/(talent)/actions';
import SpecialityForm from '@/app/(talent)/professional-profile/speciality/speciality-form';
import { Typography } from '@mui/material';

export default async function CandidateSpeciality() {
	const [candidate, specialisms] = await Promise.all([
		getCandidateProfile(),
		getSpecialisms('Freelancers'),
	]);

	if (!candidate) {
		notFound();
	}

	const defaultValues = JSON.parse(candidate?.skills as string);

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
			<SpecialityForm
				defaultValues={defaultValues}
				allSpeciality={specialisms}
			/>
		</>
	);
}
