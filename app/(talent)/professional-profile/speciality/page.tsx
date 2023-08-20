import { notFound } from 'next/navigation';

import { getSpecialisms } from '@/app/(marketing)/actions';
import SpecialityForm from '@/app/(talent)/_components/speciality-form';
import { getCandidateProfile } from '@/app/(talent)/actions';
import { Typography } from '@mui/material';

export default async function CandidateSpeciality() {
	const [candidate, specialisms] = await Promise.all([
		getCandidateProfile(),
		getSpecialisms('Professionals'),
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
