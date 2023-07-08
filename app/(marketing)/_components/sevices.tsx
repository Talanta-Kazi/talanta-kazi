'use client';

import {
	ConstructionTwoTone,
	PixTwoTone,
	WorkTwoTone,
} from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { fancyId } from '@/lib/utils';

const mock = [
	{
		title: 'Find a job',
		subtitle:
			'Fill out our standardized application on our platform. Most applicants finish in under an hour.',
		icon: <WorkTwoTone fontSize='large' color='action' />,
		href: '/job-listing',
	},
	{
		title: 'Get a professional',
		subtitle:
			"We'll immediately match you with any relevant openings and you get to pick which ones you're interested in.",
		icon: <ConstructionTwoTone fontSize='large' color='action' />,
		href: '/job-listing',
	},
	{
		title: 'General and technical',
		subtitle:
			'After 3 days all of your offers will arrive and you will have another 7 days to select your new company.',
		icon: <PixTwoTone fontSize='large' color='action' />,
		href: '/job-listing',
	},
];

export default function Services() {
	const theme = useTheme();
	return (
		<Box>
			<Box marginBottom={4}>
				<Typography
					variant='h4'
					gutterBottom
					align='center'
					sx={{ fontWeight: 700 }}
				>
					Our process to find you a new job is fast
				</Typography>
				<Typography
					variant='h6'
					component='p'
					color='text.secondary'
					align='center'
					marginY={4}
				>
					Fill out our standardized application on our platform.
					<br />
					Most applicants finish in under an hour.
				</Typography>
				<Box marginTop={3} display='flex' justifyContent='center'>
					<Button
						component={Link}
						href='/job-listing'
						variant='contained'
						color='primary'
						size='large'
						endIcon={
							<svg
								width={16}
								height={16}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M17 8l4 4m0 0l-4 4m4-4H3'
								/>
							</svg>
						}
					>
						Start searching
					</Button>
				</Box>
			</Box>
			<Box marginTop={12}>
				<Grid container spacing={4}>
					{mock.map((item, i) => (
						<Grid item xs={12} md={4} key={fancyId()}>
							<Box
								component={Link}
								href={item.href}
								display='flex'
								flexDirection='column'
								alignItems='center'
								data-aos='fade-up'
								data-aos-delay={i * 100}
								data-aos-offset={100}
								data-aos-duration={600}
							>
								<Box
									component={Avatar}
									width={60}
									height={60}
									marginBottom={2}
									bgcolor={alpha(theme.palette.primary.main, 0.3)}
									color={theme.palette.primary.main}
									variant='rounded'
									borderRadius={2}
								>
									{item.icon}
								</Box>
								<Typography
									variant='h6'
									gutterBottom
									color='text.primary'
									sx={{ fontWeight: 500 }}
									align='center'
								>
									{item.title}
								</Typography>
								{/* <Typography align="center" color="text.secondary"> */}
								{/*	{item.subtitle} */}
								{/* </Typography> */}
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
}
