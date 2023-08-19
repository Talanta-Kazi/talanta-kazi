'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import dayjsTime from '@/lib/dayjsTime';
import { stripHtml } from '@/lib/utils';
import { Job } from '@/types';
import { Bookmark, Favorite, LocationOn } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Grid,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface UserJobCardProps {
	job: Job;
}

export default function UserJobCard({
	job: {
		id,
		jobs_title,
		jobs_description,
		country,
		offered_salary,
		contract_type_id,
		city,
		application_deadline,
		created_at,
	},
}: UserJobCardProps): JSX.Element {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});
	const { push } = useRouter();

	return (
		<Grid item xs={12}>
			<Box
				component={Card}
				width={1}
				height={1}
				borderRadius={0}
				boxShadow={0}
				display='flex'
				flexDirection={{ xs: 'column', md: 'row' }}
				padding={isMd ? 2 : 0}
				sx={{
					backgroundImage: 'none',
					bgcolor: 'transparent',
					':hover': {
						bgcolor: alpha(theme.palette.primary.main, 0.1),
						color: theme.palette.primary.dark,
					},
				}}
			>
				<CardContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						padding: '0 !important',
					}}
				>
					<Box
						component={Grid}
						container
						display='flex'
						justifyContent='space-between'
					>
						<Grid
							item
							xs={8}
							sx={{ cursor: 'pointer' }}
							onClick={() => push(`/job-listing/${id}`)}
						>
							<Typography variant='h6' fontWeight={700}>
								{jobs_title}
							</Typography>
						</Grid>
						<Grid item>
							<Tooltip title='Like'>
								<IconButton aria-label='add to favorites'>
									<Favorite />
								</IconButton>
							</Tooltip>
							<Tooltip title='Save'>
								<IconButton aria-label='bookmark'>
									<Bookmark />
								</IconButton>
							</Tooltip>
						</Grid>
					</Box>
					<Stack
						marginY={1}
						direction='row'
						justifyContent='flex-start'
						alignItems='center'
						spacing={2}
					>
						<Typography
							variant='body2'
							color='text.secondary'
							sx={{ paddingY: 0, paddingRight: 1 }}
						>
							{contract_type_id}
						</Typography>
						<Divider orientation='vertical' flexItem />
						<Typography
							variant='body2'
							color='text.secondary'
							sx={{ paddingY: 0, paddingRight: 1 }}
						>
							Est. Salary: {offered_salary}
						</Typography>
						<Divider orientation='vertical' flexItem />
						<Typography
							variant='body2'
							color='text.secondary'
							sx={{ paddingY: 0 }}
						>
							Posted: {dayjsTime(created_at).fromNow()}
						</Typography>
					</Stack>
					<Typography
						color='text.secondary'
						sx={{
							display: '-webkit-box',
							WebkitLineClamp: { xs: 3, md: 2 },
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							paddingY: 0,
						}}
					>
						{stripHtml(jobs_description)}
					</Typography>
					<Box marginTop={2} display='flex' justifyContent='space-between'>
						<Box marginTop={2} display='flex' justifyContent='space-between'>
							<Stack
								marginY={0}
								direction='row'
								justifyContent='flex-start'
								alignItems='center'
								spacing={2}
							>
								<Box
									component={Button}
									variant='text'
									color='text.secondary'
									startIcon={<LocationOn />}
									sx={{ paddingY: 0, paddingX: 0 }}
								>
									{`${city}, ${country}`}
								</Box>
								<Typography
									variant='body2'
									color='text.secondary'
									sx={{ paddingY: 0 }}
								>
									Deadline:{' '}
									{dayjsTime(application_deadline).format('YYYY-MM-DD')}
								</Typography>
							</Stack>
						</Box>
						<Button
							variant='contained'
							size='small'
							component={Link}
							href={`/job-listing/${id}`}
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
							more
						</Button>
					</Box>
				</CardContent>
			</Box>
			<Divider sx={{ marginY: 1 }} />
		</Grid>
	);
}
