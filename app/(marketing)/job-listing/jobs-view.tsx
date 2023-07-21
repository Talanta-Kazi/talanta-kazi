'use client';

import Hero from '@/app/(marketing)/job-listing/hero';
import { ChangeEvent, useState } from 'react';
import { ContractType, Job } from '@/types';
import Container from '@/components/container';
import { Box, Grid, Pagination } from '@mui/material';
import JobCard from '@/components/cards/job-card';
import { fancyId } from '@/lib/utils';

interface JobsViewProps {
	jobs: Array<Job>;
	contractTypes: Array<ContractType>;
}

const JOBS_PER_PAGE = 10;

export default function JobsView({ jobs, contractTypes }: JobsViewProps) {
	const [searchValue, setSearchValue] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);

	const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
	};

	const filteredJobs = jobs?.filter((job) => {
		const searchContent = job.jobs_title + job.jobs_description;
		return searchContent.toLowerCase().includes(searchValue.toLowerCase());
	});

	// If initialDisplayPosts exist, display it if no searchValue is specified
	const displayJobs = jobs?.length > 0 && !searchValue ? jobs : filteredJobs;

	const contract = contractTypes,
		contractObject = contract?.reduce(
			// @ts-expect-error
			(r, { id, contract_types_name }) => ((r[id] = contract_types_name), r),
			{},
		);

	const modifiedJobs = displayJobs?.map((job) => {
		return {
			...job,
			// @ts-expect-error
			contract_type_id: contractObject[job.contract_type_id as string],
		};
	});

	const getPaginatedJobs = () => {
		const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
		return modifiedJobs?.slice(startIndex, startIndex + JOBS_PER_PAGE);
	};

	const totalPages = Math.ceil(modifiedJobs?.length / JOBS_PER_PAGE);

	const totalJobsFiltered = modifiedJobs.length;

	return (
		<>
			<Hero
				handleSearchValue={setSearchValue}
				totalJobsFiltered={totalJobsFiltered}
			/>
			<Container maxWidth={{ sm: 720, md: 960 }}>
				<Box>
					<Grid container spacing={4}>
						{getPaginatedJobs()?.map((job: Job) => (
							<JobCard key={fancyId()} job={job} />
						))}
						<Grid item container justifyContent='center' xs={12}>
							<Pagination
								count={totalPages}
								page={currentPage}
								size='large'
								color='primary'
								onChange={handlePageChange}
							/>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
}
