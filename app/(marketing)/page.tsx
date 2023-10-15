import { Fragment } from 'react';

import {
	BannerConsultants,
	BannerFreelancers,
	BannerProfessionals,
	Hero,
	Services,
} from '@/app/(marketing)/_components';
import Jobs from '@/app/(marketing)/_components/jobs';
import { getContractTypes, getJobs } from '@/app/(marketing)/actions';
import Container from '@/components/container';
import { Box } from '@mui/material';

export default async function MarketingPage() {
	const [allJobs, contractTypes] = await Promise.all([
		getJobs(),
		getContractTypes(),
	]);

	const jobs = allJobs.slice(0, 3);

	return (
		<Fragment>
			<Hero />
			<Container paddingY={{ md: 6, sm: 4, xs: 2 }}>
				<Services />
			</Container>
			<Box bgcolor='alternate.main'>
				<Container>
					<BannerProfessionals />
					<BannerFreelancers />
					<BannerConsultants />
				</Container>
			</Box>
			<Container maxWidth={{ md: 960, sm: 720 }}>
				<Jobs jobs={jobs} contractTypes={contractTypes} />
			</Container>
		</Fragment>
	);
}
