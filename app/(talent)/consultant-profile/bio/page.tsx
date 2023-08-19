import { notFound } from 'next/navigation';

import { getCandidateProfile } from '@/app/(talent)/actions';
import BioForm from '@/app/(talent)/professional-profile/bio/bio-form';
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
