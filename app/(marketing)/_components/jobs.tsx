'use client';

import { Metadata } from 'next';
import Link from 'next/link';

import JobCard from '@/components/cards/job-card';
import { fancyId } from '@/lib/utils';
import { ContractType, Job } from '@/types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
	description: 'List of all jobs available on the platform.',
	title: 'Jobs Listing',
};

export default function Jobs({
	jobs,
	contractTypes,
}: {
	jobs: Array<Job>;
	contractTypes: Array<ContractType>;
}) {
	const contract = contractTypes,
		contractObject = contract.reduce(
			// @ts-expect-error
			(r, { id, contract_types_name }) => ((r[id] = contract_types_name), r),
			{}
		);

	const modifiedJobs = jobs.map((job) => {
		return {
			...job,
			// @ts-expect-error
			contract_type_id: contractObject[job.contract_type_id as string],
		};
	});

	return (
		<Box>
			<Box marginBottom={4}>
				<Typography
					variant='h4'
					gutterBottom
					sx={{ fontWeight: 700 }}
					align='center'
				>
					Our latest jobs
				</Typography>
			</Box>
			<Grid marginY={4} justifyContent='center' alignItems='center'>
				{modifiedJobs.map((job) => (
					<JobCard key={fancyId()} job={job} />
				))}
				{(modifiedJobs?.length as number) >= 3 ? (
					<Grid item container justifyContent='center' xs={12}>
						<Button
							component={Link}
							href='/job-listing'
							variant='contained'
							size='large'
							endIcon={
								<Box
									component='svg'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									width={24}
									height={24}
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M17 8l4 4m0 0l-4 4m4-4H3'
									/>
								</Box>
							}
						>
							View all
						</Button>
					</Grid>
				) : null}
			</Grid>
		</Box>
	);
}
