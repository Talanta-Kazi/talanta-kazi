'use client';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';
import { ContractType, Job } from '@/types';
import { useRouter } from 'next/navigation';
import { ArrowBackRounded } from '@mui/icons-material';
import { isBrowser } from '@/lib/utils';
import { htmlBulletList } from '@/lib/htmlBulletedList';
import { Suspense } from 'react';

interface SingleJobViewProps {
	job: Job;
	contractTypes: Array<ContractType>;
}

export default function SingleJobView({
	job,
	contractTypes,
}: SingleJobViewProps) {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});
	const { back } = useRouter();

	const contract = contractTypes,
		contractObject = contract?.reduce(
			// @ts-expect-error
			(r, { id, contract_types_name }) => ((r[id] = contract_types_name), r),
			{},
		);

	const modifiedJob = {
		...job,
		// @ts-expect-error
		contract_type_id: contractObject[job.contract_type_id as string],
	};

	const {
		jobs_title,
		jobs_description,
		city,
		country,
		contract_type_id,
		duties_responsibilities,
		qualifications_competencies,
	} = modifiedJob;

	const modifiedJobsDescription = isBrowser
		? htmlBulletList(jobs_description)
		: null;

	return (
		<Box>
			<Box
				sx={{
					left: { xs: 0, md: 24 },
					marginY: { xs: 4, md: 0 },
					display: 'flex',
					position: { xs: 'relative', md: 'absolute' },
				}}
				alignItems={'center'}
				onClick={() => back()}
			>
				<IconButton style={{ marginRight: theme.spacing(1) }}>
					<ArrowBackRounded className='learn-more-link__arrow' />
				</IconButton>
				<Typography variant='body1' sx={{ cursor: 'pointer' }}>
					Back to all jobs
				</Typography>
			</Box>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={{ xs: 'flex-start', sm: 'center' }}
				flexDirection={{ xs: 'column', sm: 'row' }}
			>
				<Box>
					<Typography fontWeight={700} variant={'h4'} gutterBottom>
						{jobs_title}
					</Typography>
					<Typography
						variant={'h6'}
					>{`${city}, ${country} - ${contract_type_id}`}</Typography>
				</Box>
				<Box display='flex' marginTop={{ xs: 2, md: 0 }}>
					<Button variant='contained' color='primary' size='large'>
						Apply now
					</Button>
				</Box>
			</Box>
			<Divider sx={{ marginY: 4 }} />
			<Grid container spacing={isMd ? 4 : 2}>
				<Grid item xs={12}>
					<Box marginBottom={3}>
						<Typography variant={'h5'} fontWeight={700} gutterBottom>
							Job description
						</Typography>
						<Suspense fallback={<div>Loading...</div>}>
							{htmlBulletList(jobs_description)}
						</Suspense>
					</Box>
					<Box marginBottom={3}>
						<Typography variant={'h5'} fontWeight={700} gutterBottom>
							Duties and Responsibilities
						</Typography>
						<Suspense fallback={<div>Loading...</div>}>
							{htmlBulletList(duties_responsibilities)}
						</Suspense>
					</Box>
					<Box>
						<Typography variant={'h5'} fontWeight={700} gutterBottom>
							Job Requirements
						</Typography>
						<Suspense fallback={<div>Loading...</div>}>
							{htmlBulletList(qualifications_competencies)}
						</Suspense>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
