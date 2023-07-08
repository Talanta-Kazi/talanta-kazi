'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';

export default function Bookings(): JSX.Element {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Box>
			<Grid container spacing={4}>
				<Grid
					item
					container
					xs={12}
					md={6}
					data-aos={isMd ? 'fade-right' : 'fade-up'}
					alignItems='center'
				>
					<Box>
						<Typography variant='h4' gutterBottom sx={{ fontWeight: 700 }}>
							Career Advisory Services for Candidates
						</Typography>
						<Typography
							variant='h6'
							component='p'
							color='text.secondary'
							gutterBottom
							marginY={4}
						>
							For information and bookings, call +254 727 517 071 We&apos;ll
							give you the best career advice for your growth.
						</Typography>
						<Button
							component={Link}
							href='/contingency-hiring'
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
							Enquire now
						</Button>
					</Box>
				</Grid>
				<Grid
					item
					container
					justifyContent='center'
					alignItems='center'
					xs={12}
					md={6}
				>
					<Box maxWidth={500} width={1}>
						<Box
							component='img'
							src='/img/career-advisory.svg'
							width={1}
							height={1}
							sx={{
								filter:
									theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
							}}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
