'use client';

import Container from '@/components/container';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, useTheme } from '@mui/material/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from '@/components/link';

const Hero = (): JSX.Element => {
	const { data: session, status } = useSession();
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	function LeftSide() {
		return (
			<Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
				<Box marginBottom={2}>
					<Typography
						variant='h3'
						color='text.primary'
						sx={{
							fontWeight: 700,
						}}
					>
						Where talent{' '}
						<Typography
							color='secondary'
							component='span'
							variant='inherit'
							sx={{
								background: `linear-gradient(180deg, transparent 82%, ${alpha(
									theme.palette.secondary.main,
									0.3,
								)} 0%)`,
							}}
						>
							meets opportunity
						</Typography>
					</Typography>
				</Box>
				<Box marginY={4}>
					<Typography variant='h6' component='p' color='text.secondary'>
						Looking for work? Organize your search, stand out to employers, and
						track your progress here. Let&apos;s get to work.
					</Typography>
				</Box>
				<Box
					display='flex'
					flexDirection={{ xs: 'column', sm: 'row' }}
					alignItems={{ xs: 'stretched', sm: 'flex-start' }}
				>
					<Button
						component={Link}
						variant='contained'
						color='primary'
						size='large'
						fullWidth={!isMd}
						href='/job-listing'
					>
						Find me a job
					</Button>
					<Button
						component={Link}
						variant='outlined'
						sx={{
							marginTop: { xs: 2, sm: 0 },
							marginLeft: { sm: 2 },
							color: 'text.primary',
							backgroundColor: 'background.paper',
							'&:hover': {
								backgroundColor: '#f4f4f6',
							},
						}}
						size='large'
						fullWidth={!isMd}
						href='/profile'
					>
						I&apos;m hiring
					</Button>
				</Box>
			</Box>
		);
	}

	function RightSide(): JSX.Element {
		return (
			<Grid container spacing={2} sx={{ display: 'flex' }}>
				<Grid
					item
					container
					justifyContent={'flex-end'}
					alignItems={'flex-end'}
					xs={4}
					sx={{
						'& .lazy-load-image-loaded': {
							width: '80%',
							height: '80%',
							display: 'flex !important',
						},
					}}
				>
					<Box
						component={LazyLoadImage}
						height={1}
						width={1}
						borderRadius={2}
						src={'/img/home1.jpeg'}
						alt='...'
						effect='blur'
						sx={{
							objectFit: 'cover',
							filter:
								theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
						}}
					/>
				</Grid>
				<Grid
					item
					container
					justifyContent={'flex-start'}
					alignItems={'flex-end'}
					xs={8}
					sx={{
						'& .lazy-load-image-loaded': {
							display: 'flex !important',
							width: 1,
						},
					}}
				>
					<Box
						component={LazyLoadImage}
						height={1}
						width={1}
						borderRadius={2}
						src={'/img/home2.jpeg'}
						alt='...'
						effect='blur'
						sx={{
							objectFit: 'cover',
							filter:
								theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
						}}
					/>
				</Grid>
				<Grid
					item
					container
					justifyContent={'flex-end'}
					alignItems={'flex-start'}
					xs={8}
					sx={{
						'& .lazy-load-image-loaded': {
							display: 'flex !important',
							width: 1,
						},
					}}
				>
					<Box
						component={LazyLoadImage}
						height={1}
						width={1}
						borderRadius={2}
						src={'/img/home3.jpeg'}
						alt='...'
						effect='blur'
						sx={{
							objectFit: 'cover',
							filter:
								theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
						}}
					/>
				</Grid>
				<Grid
					item
					container
					justifyContent={'flex-start'}
					alignItems={'flex-start'}
					xs={4}
					sx={{
						'& .lazy-load-image-loaded': {
							width: '80%',
							height: '80%',
							display: 'flex !important',
						},
					}}
				>
					<Box
						component={LazyLoadImage}
						height={1}
						width={1}
						borderRadius={2}
						src={'/img/home4.jpeg'}
						alt='...'
						effect='blur'
						sx={{
							objectFit: 'cover',
							filter:
								theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
						}}
					/>
				</Grid>
			</Grid>
		);
	}

	return (
		<Box
			sx={{
				width: 1,
				height: 1,
				overflow: 'hidden',
			}}
		>
			<Container paddingX={0} paddingY={0}>
				<Box
					display={'flex'}
					flexDirection={{ xs: 'column', md: 'row' }}
					position={'relative'}
					minHeight={{ md: 600 }}
				>
					<Box
						width={1}
						order={{ xs: 2, md: 1 }}
						display={'flex'}
						alignItems={'center'}
					>
						<Container>
							<LeftSide />
						</Container>
					</Box>
					<Box
						margin={2}
						sx={{
							flex: { xs: '0 0 100%', md: '0 0 50%' },
							position: 'relative',
							maxWidth: { xs: '100%', md: '50%' },
							order: { xs: 1, md: 2 },
						}}
					>
						<Box
							sx={{
								width: { xs: 1, md: '30vw' },
								height: '100%',
								position: 'relative',
							}}
						>
							<Box
								sx={{
									width: '100%',
									height: '100%',
									overflow: 'hidden',
								}}
							>
								<RightSide />
							</Box>
						</Box>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Hero;
