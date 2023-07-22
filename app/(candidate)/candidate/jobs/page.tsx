import Container from '@/components/container';
import { getContractTypes, getJobs } from '@/app/(marketing)/actions';
import { fancyId } from '@/lib/utils';
import { Grid } from '@mui/material';
import UserJobCard from '@/app/(candidate)/candidate/jobs/user-job-card';

export default async function CandidateJobs() {
	const [allJobs, contractTypes] = await Promise.all([
		getJobs(),
		getContractTypes(),
	]);

	return (
		<Container>
			<Grid
				container
				spacing={{ xs: 4, md: 2 }}
				bgcolor='background.paper'
				sx={{
					borderRadius: 2,
				}}
			>
				{allJobs?.map((job) => <UserJobCard key={fancyId()} job={job} />)}
			</Grid>
		</Container>
	);
}
