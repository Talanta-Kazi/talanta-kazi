'use client';

import { ChangeEvent, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Button, Divider, Drawer, Grid, Pagination } from '@mui/material';
import Topbar from '@/app/(talent)/talent/jobs/topbar';
import UserJobCard from '@/app/(talent)/talent/jobs/user-job-card';
import { fancyId } from '@/lib/utils';
import { Job } from '@/types';
import FilterSpecialism from '@/app/(talent)/talent/jobs/filter-specialism';

interface SidebarProps {
	specialisms: any;
	jobsCount: number;
	jobs: Array<Job>;
}

const JOBS_PER_PAGE = 10;

export default function Sidebar({
	jobs,
	specialisms,
	jobsCount,
}: SidebarProps) {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const [currentPage, setCurrentPage] = useState<number>(1);

	const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
	};

	const getPaginatedJobs = () => {
		const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
		return jobs?.slice(startIndex, startIndex + JOBS_PER_PAGE);
	};

	const [openSidebar, setOpenSidebar] = useState(false);

	const handleSidebarOpen = (): void => setOpenSidebar(true);

	const handleSidebarClose = (): void => setOpenSidebar(false);

	const open = isMd ? false : openSidebar;

	const totalPages = Math.ceil(jobs?.length / JOBS_PER_PAGE);

	return (
		<Box display={'flex'}>
			<Drawer
				anchor='left'
				onClose={handleSidebarClose}
				open={open}
				variant={isMd ? 'permanent' : 'temporary'}
				sx={{
					'& .MuiPaper-root': {
						position: 'sticky',
						width: '100%',
						maxWidth: { xs: 300, md: 260 },
						minWidth: { xs: 300, md: 260 },
						zIndex: 1100,
						top: theme.spacing(10),
						border: `1px solid ${theme.palette.divider}`,
						borderRadius: 2,
					},
				}}
			>
				<Box padding={2}>
					<FilterSpecialism specialisms={specialisms} />
					<Divider sx={{ my: 3 }} />
					{/*<FilterCategory />*/}
					{/*<Divider sx={{ my: 3 }} />*/}
					{/*<FilterGender />*/}
					{/*<Divider sx={{ my: 3 }} />*/}
					{/*<FilterBrand />*/}
					{/*<Divider sx={{ my: 3 }} />*/}
					{/*<FilterSize />*/}
					{/*<Divider sx={{ my: 3 }} />*/}
					{/*<FilterColor />*/}
					<Button variant={'contained'} size={'large'} fullWidth sx={{ mt: 3 }}>
						Reset all
					</Button>
				</Box>
			</Drawer>
			<Box marginLeft={{ xs: 0, md: 4 }} width={1}>
				<Topbar onSidebarOpen={handleSidebarOpen} jobsCount={jobsCount ?? 0} />
				<Box paddingY={4}>
					<Grid
						container
						spacing={{ xs: 4, md: 2 }}
						bgcolor='background.paper'
						sx={{
							borderRadius: 2,
						}}
					>
						{getPaginatedJobs()?.map((job) => (
							<UserJobCard key={fancyId()} job={job} />
						))}
					</Grid>
				</Box>
				<Box display={'flex'} justifyContent={'center'} width={1}>
					<Pagination
						count={totalPages}
						page={currentPage}
						size='large'
						color='primary'
						onChange={handlePageChange}
					/>
				</Box>
			</Box>
		</Box>
	);
}
