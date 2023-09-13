import { notFound } from 'next/navigation';

import BioForm from '@/app/(talent)/_components/bio-form';
import { getCandidateProfile } from '@/app/(talent)/actions';
import { Typography } from '@mui/material';

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
