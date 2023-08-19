import { notFound } from 'next/navigation';

import { getContractTypes, getJobById } from '@/app/(marketing)/actions';
import SingleJobView from '@/app/(marketing)/job-listing/[id]/single-job-view';
import { env } from '@/env.mjs';

interface Props {
	params: {
		id: string;
	};
}

export async function generateStaticParams() {
	const jobs = await fetch(`${env.API_URL}/jobs/`).then((res) => res.json());
	return jobs.map((job: { id: string }) => ({
		params: {
			id: job.id,
		},
	}));
}

export default async function SingleJobListingPage({ params }: Props) {
	const [job, contractTypes] = await Promise.all([
		getJobById(params.id),
		getContractTypes(),
	]);

	if (!job) {
		notFound();
	}

	return <SingleJobView job={job} contractTypes={contractTypes} />;
}
