'use client';

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

interface JobProps {
	job: Job;
}

function JobCard({
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
}: JobProps): JSX.Element {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const { push } = useRouter();

	return (
		<Grid item xs={12} sx={{ marginBottom: 1, padding: '0 !important' }}>
			<Box
				component={Card}
				width={1}
				height={1}
				borderRadius={isMd ? 2 : 0}
				border={isMd ? 1 : 0}
				borderColor={theme.palette.divider}
				padding={isMd ? 2 : 0}
				boxShadow={0}
				display='flex'
				flexDirection={{ md: 'row', xs: 'column' }}
				sx={{
					// border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
					':hover': {
						bgcolor: alpha(theme.palette.primary.main, 0.1),
						color: theme.palette.primary.dark,
					},

					backgroundImage: 'none',

					bgcolor: 'transparent',
				}}
			>
				<CardContent
					sx={{
						// width: { xs: 1, md: "80%" },
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
							sx={{ paddingRight: 1, paddingY: 0 }}
						>
							{contract_type_id}
						</Typography>
						<Divider orientation='vertical' flexItem />
						<Typography
							variant='body2'
							color='text.secondary'
							sx={{ paddingRight: 1, paddingY: 0 }}
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
							overflow: 'hidden',
							paddingY: 0,
							textOverflow: 'ellipsis',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: { md: 2, xs: 3 },
						}}
					>
						{stripHtml(jobs_description)}
					</Typography>
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
								sx={{ paddingX: 0, paddingY: 0 }}
							>
								{`${city}, ${country}`}
							</Box>
							<Typography
								variant='body2'
								color='text.secondary'
								sx={{ paddingY: 0 }}
							>
								Deadline: {dayjsTime(application_deadline).format('YYYY-MM-DD')}
							</Typography>
						</Stack>
					</Box>
				</CardContent>
			</Box>
			<Divider sx={{ display: { md: 'none', xs: 'block' }, marginY: 2 }} />
		</Grid>
	);
}

export default JobCard;
