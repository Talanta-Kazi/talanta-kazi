import { getCandidateProfile } from '@/app/(talent)/actions';
import { notFound } from 'next/navigation';
import { Typography } from '@mui/material';
import SpecialityForm from '@/app/(talent)/professional-profile/speciality/speciality-form';
import { getSpecialisms } from '@/app/(marketing)/actions';

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
