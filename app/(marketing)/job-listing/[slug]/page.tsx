import { getContractTypes, getJobById } from '@/app/(marketing)/actions';
import { notFound } from 'next/navigation';
import SingleJobView from '@/app/(marketing)/job-listing/[slug]/single-job-view';

interface Props {
	params: {
		slug: string;
	};
}

export default async function SingleJobListingPage({ params }: Props) {
	const [job, contractTypes] = await Promise.all([
		getJobById(params.slug),
		getContractTypes(),
	]);

	if (!job) {
		notFound();
	}

	return <SingleJobView job={job} contractTypes={contractTypes} />;
}
