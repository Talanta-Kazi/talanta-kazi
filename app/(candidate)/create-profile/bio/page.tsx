import { getCandidateProfile } from '@/app/(candidate)/actions';
import { notFound } from 'next/navigation';
import { Typography } from '@mui/material';
import BioForm from '@/app/(candidate)/create-profile/bio/bio-form';

export default async function CandidateBio() {
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
			<BioForm candidate={candidate} />
		</>
	);
}
