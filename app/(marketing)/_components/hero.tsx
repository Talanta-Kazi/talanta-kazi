import Container from '@/components/container';
import { Box, Button, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, useTheme } from '@mui/material/styles';
import Slider from 'react-slick';
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
						variant='contained'
						color='primary'
						size='large'
						fullWidth={!isMd}
						href='/job-listing'
						// endIcon={
						// 	<Box
						// 		component="svg"
						// 		xmlns="http://www.w3.org/2000/svg"
						// 		fill="none"
						// 		viewBox="0 0 24 24"
						// 		stroke="currentColor"
						// 		width={24}
						// 		height={24}
						// 	>
						// 		<path
						// 			strokeLinecap="round"
						// 			strokeLinejoin="round"
						// 			strokeWidth={2}
						// 			d="M17 8l4 4m0 0l-4 4m4-4H3"
						// 		/>
						// 	</Box>
						// }
					>
						Find me a job!
					</Button>
					<Button
						variant='outlined'
						sx={{
							color: 'text.primary',
							marginLeft: { xs: 0, sm: 2 },
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
		const sliderOpts = {
			dots: false,
			infinite: true,
			speed: 3000,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			arrows: true,
			fade: true,
		};

		return (
			<Box
				sx={{
					height: { xs: 'auto', md: 1 },
					'& .slick-slide img': {
						objectFit: 'cover',
					},
					'& .slick-list, & .slick-slider, & .slick-track, & .slick-slide > div':
						{
							height: { xs: 'auto', md: 1 },
						},
					'& .slick-prev, & .slick-next': {
						zIndex: 2,
						bottom: 0,
						top: '100%',
						left: '100%',
						right: 0,
						transform: `translate(-100%, calc(-100% - ${theme.spacing(2)}))`,
						marginLeft: theme.spacing(-2),
						width: 32,
						height: 32,
						'&:before': {
							fontSize: 32,
						},
					},
					'& .slick-prev': {
						marginLeft: theme.spacing(-7),
					},
					'& .lazy-load-image-loaded': {
						height: 1,
						width: 1,
					},
				}}
			>
				{/* eslint-disable-next-line react/jsx-props-no-spreading */}
				<Slider {...sliderOpts}>
					{[
						'/img/home1.jpeg',
						'/img/home2.jpeg',
						'/img/home3.jpeg',
						'/img/home4.jpeg',
					].map((item) => (
						<Box
							key={item}
							component={LazyLoadImage}
							effect='blur'
							src={item}
							height={{ xs: 'auto', md: 1 }}
							maxHeight={{ xs: 300, md: 1 }}
							width={1}
							maxWidth={1}
						/>
					))}
				</Slider>
			</Box>
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
						sx={{
							flex: { xs: '0 0 100%', md: '0 0 50%' },
							position: 'relative',
							maxWidth: { xs: '100%', md: '50%' },
							order: { xs: 1, md: 2 },
						}}
					>
						<Box
							sx={{
								width: { xs: 1, md: '50vw' },
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
								<Box
									sx={{
										overflow: 'hidden',
										left: '0%',
										width: 1,
										height: 1,
										position: { xs: 'relative', md: 'absolute' },
										clipPath: {
											xs: 'none',
											md: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
										},
										shapeOutside: {
											xs: 'none',
											md: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
										},
									}}
								>
									<RightSide />
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Hero;
