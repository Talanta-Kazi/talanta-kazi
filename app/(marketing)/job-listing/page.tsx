import { getContractTypes, getJobs } from '@/app/(marketing)/actions';
import JobsView from '@/app/(marketing)/job-listing/jobs-view';

export default async function JobListingPage() {
	const [allJobs, contractTypes] = await Promise.all([
		getJobs(),
		getContractTypes(),
	]);

	return <JobsView jobs={allJobs} contractTypes={contractTypes} />;
}
