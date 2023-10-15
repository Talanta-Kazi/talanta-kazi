'use client';

import { ChangeEvent, useState } from 'react';

import JobCard from '@/components/cards/job-card';
import Container from '@/components/container';
import { cn, fancyId } from '@/lib/utils';
import { ContractType, Job } from '@/types';
import { Search } from '@mui/icons-material';
import {
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	InputBase,
	Pagination,
	Paper,
	Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

interface JobsViewProps {
	jobs: Array<Job>;
	contractTypes: Array<ContractType>;
}

const JOBS_PER_PAGE = 10;

export default function JobsView({ jobs, contractTypes }: JobsViewProps) {
	const theme = useTheme();
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
			{}
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
			<Box
				bgcolor='alternate.main'
				padding={{ md: 4, xs: 2 }}
				borderRadius={2}
				sx={{
					'&::after': {
						backgroundImage: `radial-gradient(${alpha(
							'#c9ad24',
							0.4
						)} 20%, transparent 20%)`,
						backgroundSize: '16px 16px',
						content: '""',
						height: '100%',
						left: '5%',
						opacity: 0.2,
						position: 'absolute',
						top: 0,
						width: '30%',
						zIndex: 1,
					},
					position: 'relative',
				}}
			>
				<Box position={'relative'} zIndex={3}>
					<Container>
						<Grid container spacing={4}>
							<Grid
								item
								container
								xs={12}
								md={6}
								alignItems='center'
								sx={{ position: 'relative' }}
							>
								<Box className={cn()} marginBottom={4}>
									<Box marginBottom={2}>
										<Typography
											variant='h3'
											component='h3'
											sx={{
												fontWeight: 700,
											}}
										>
											Jobs board listing
										</Typography>
									</Box>
									<Box marginBottom={3}>
										<Typography
											variant='h6'
											component='p'
											color='text.secondary'
										>
											Productivity tools can either help you or get in the way.
										</Typography>
									</Box>

									<Paper
										component='form'
										noValidate
										autoComplete='off'
										sx={{
											alignItems: 'center',
											display: 'flex',
											p: '2px 4px',
											width: 'auto',
										}}
									>
										<IconButton sx={{ p: '10px' }} aria-label='menu'>
											<Search />
										</IconButton>
										<InputBase
											sx={{ flex: 1, ml: 1 }}
											placeholder='Search jobs'
											inputProps={{ 'aria-label': 'search google maps' }}
											onChange={({ target }) => setSearchValue(target.value)}
										/>
										<Typography
											color='text.secondary'
											variant='subtitle2'
											sx={{ whiteSpace: 'nowrap' }}
										>
											{`${totalJobsFiltered} Job${
												totalJobsFiltered > 1 ? 's' : ''
											}`}
										</Typography>
										<Divider sx={{ height: 28, m: 1 }} orientation='vertical' />
										<Button
											sx={{
												height: 54,
												minWidth: 50,
												whiteSpace: 'nowrap',
											}}
											variant='contained'
											color='primary'
											size='medium'
										>
											Search
										</Button>
									</Paper>
								</Box>
							</Grid>
							<Grid item xs={12} md={6}>
								<Box
									height={1}
									width={1}
									display='flex'
									justifyContent='center'
								>
									<Box
										height={1}
										width={1}
										maxWidth={{ md: '100%', xs: 600 }}
										maxHeight={400}
									>
										<Box
											component='img'
											src='/img/jobs-listing.svg'
											width={1}
											height={1}
											sx={{
												filter:
													theme.palette.mode === 'dark'
														? 'brightness(0.8)'
														: 'none',
											}}
										/>
									</Box>
								</Box>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</Box>

			<Container maxWidth={{ md: 960, sm: 720 }}>
				<Box>
					<Grid marginY={4} justifyContent='center' alignItems='center'>
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
