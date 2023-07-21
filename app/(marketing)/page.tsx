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
			<Hero />
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
