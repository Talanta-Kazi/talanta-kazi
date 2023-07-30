import { getCandidateProfile } from '@/app/(candidate)/actions';
import { notFound } from 'next/navigation';
import { Typography } from '@mui/material';
import PortfolioForm from '@/app/(candidate)/create-profile/portfolio/portfolio-form';

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
