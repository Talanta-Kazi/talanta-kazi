import Container from '@/components/container';
import {
	getContractTypes,
	getJobs,
	getSpecialisms,
} from '@/app/(marketing)/actions';
import Sidebar from '@/app/(candidate)/candidate/jobs/sidebar';

export default async function CandidateJobs() {
	const [allJobs, contractTypes, specialisms] = await Promise.all([
		getJobs(),
		getContractTypes(),
		getSpecialisms(),
	]);

	const contract = contractTypes,
		contractObject = contract?.reduce(
			// @ts-expect-error
			(r, { id, contract_types_name }) => ((r[id] = contract_types_name), r),
			{},
		);

	const modifiedJobs = allJobs?.map((job) => {
		return {
			...job,
			// @ts-expect-error
			contract_type_id: contractObject[job.contract_type_id as string],
		};
	});

	return (
		<Container>
			<Sidebar
				specialisms={specialisms}
				jobsCount={modifiedJobs.length}
				jobs={modifiedJobs}
			/>
		</Container>
	);
}
