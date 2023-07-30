import { getCandidateProfile } from '@/app/(candidate)/actions';
import { notFound } from 'next/navigation';
import { Typography } from '@mui/material';
import SpecialityForm from '@/app/(candidate)/create-profile/speciality/speciality-form';
import { getSpecialisms } from '@/app/(marketing)/actions';

export default async function CandidateSpeciality() {
	const [candidate, specialisms] = await Promise.all([
		getCandidateProfile(),
		getSpecialisms(),
	]);

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
			<SpecialityForm candidate={candidate} allSpeciality={specialisms} />
		</>
	);
}
