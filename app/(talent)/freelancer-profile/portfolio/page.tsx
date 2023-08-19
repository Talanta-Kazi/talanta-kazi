import { notFound } from 'next/navigation';

import { getCandidateProfile } from '@/app/(talent)/actions';
import PortfolioForm from '@/app/(talent)/professional-profile/portfolio/portfolio-form';
import { Typography } from '@mui/material';

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
				Add your portfolio
			</Typography>
			<PortfolioForm candidate={candidate} />
		</>
	);
}
