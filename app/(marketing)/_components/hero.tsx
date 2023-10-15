'use client';

import Link from 'next/link';

import Container from '@/components/container';
import { Box, Button, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSession } from 'next-auth/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
						Unleash Kenyan talent{' '}
						<Typography
							color='secondary'
							component='span'
							variant='inherit'
							sx={{
								background: `linear-gradient(180deg, transparent 82%, ${alpha(
									theme.palette.secondary.main,
									0.3
								)} 0%)`,
							}}
						>
							Techies, Creatives, Designers & Analysts
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
					flexDirection={{ sm: 'row', xs: 'column' }}
					alignItems={{ sm: 'flex-start', xs: 'stretched' }}
				>
					<Button
						component={Link}
						variant='contained'
						color='primary'
						size='large'
						fullWidth={!isMd}
						href='/employers'
					>
						I&apos;m hiring
					</Button>
					<Button
						component={Link}
						variant='outlined'
						sx={{
							'&:hover': {
								backgroundColor: '#f4f4f6',
							},
							backgroundColor: 'background.paper',
							color: 'text.primary',
							marginLeft: { sm: 2 },
							marginTop: { sm: 0, xs: 2 },
						}}
						size='large'
						fullWidth={!isMd}
						href='/job-listing'
					>
						Find me a job
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
							display: 'flex !important',
							height: '80%',
							width: '80%',
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
							filter:
								theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
							objectFit: 'cover',
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
							filter:
								theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
							objectFit: 'cover',
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
							filter:
								theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
							objectFit: 'cover',
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
							display: 'flex !important',
							height: '80%',
							width: '80%',
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
							filter:
								theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
							objectFit: 'cover',
						}}
					/>
				</Grid>
			</Grid>
		);
	}

	return (
		<Box
			bgcolor={'alternate.main'}
			sx={{
				'&::after': {
					backgroundImage: `radial-gradient(${alpha(
						theme.palette.primary.dark,
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
				<Box
					sx={{
						height: 1,
						overflow: 'hidden',
						width: 1,
					}}
				>
					<Container paddingX={0} paddingY={0}>
						<Box
							display={'flex'}
							flexDirection={{ md: 'row', xs: 'column' }}
							position={'relative'}
							minHeight={{ md: 600 }}
						>
							<Box
								width={1}
								order={{ md: 1, xs: 2 }}
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
									flex: { md: '0 0 50%', xs: '0 0 100%' },
									maxWidth: { md: '50%', xs: '100%' },
									order: { md: 2, xs: 1 },
									position: 'relative',
								}}
							>
								<Box
									sx={{
										height: '100%',
										position: 'relative',
										width: { md: '30vw', xs: 1 },
									}}
								>
									<Box
										sx={{
											height: '100%',
											overflow: 'hidden',
											width: '100%',
										}}
									>
										<RightSide />
									</Box>
								</Box>
							</Box>
						</Box>
					</Container>
				</Box>
			</Box>
		</Box>
	);
};

export default Hero;
