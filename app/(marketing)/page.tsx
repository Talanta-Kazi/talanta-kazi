import { Box } from '@mui/material';
import Container from '@/components/container';
import {
	Bookings,
	Hero,
	Reviews,
	Services,
} from '@/app/(marketing)/_components';
import Jobs from '@/app/(marketing)/_components/jobs';
import { getContractTypes, getJobs } from '@/app/(marketing)/actions';
import { Fragment } from 'react';

export default async function MarketingPage() {
	const [allJobs, contractTypes] = await Promise.all([
		getJobs(),
		getContractTypes(),
	]);

	const jobs = allJobs.slice(0, 3);

	return (
		<Fragment>
			<Box
				bgcolor={'alternate.main'}
				// sx={{
				// 	position: 'relative',
				// 	'&::after': {
				// 		position: 'absolute',
				// 		content: '""',
				// 		width: '30%',
				// 		zIndex: 1,
				// 		top: 0,
				// 		left: '5%',
				// 		height: '100%',
				// 		backgroundSize: '16px 16px',
				// 		backgroundImage: `radial-gradient(${alpha(
				// 			'#c9ad24',
				// 			0.4,
				// 		)} 20%, transparent 20%)`,
				// 		opacity: 0.2,
				// 	},
				// }}
			>
				<Box position={'relative'} zIndex={3}>
					<Hero />
				</Box>
			</Box>
			<Container paddingY={{ xs: 2, sm: 4, md: 6 }}>
				<Services />
			</Container>
			<Box bgcolor='alternate.main'>
				<Container>
					<Bookings />
				</Container>
			</Box>
			<Box bgcolor='alternate.main'>
				<Container>
					<Reviews />
				</Container>
			</Box>
			<Container maxWidth={{ sm: 720, md: 960 }}>
				<Jobs jobs={jobs} contractTypes={contractTypes} />
			</Container>
		</Fragment>
	);
}
