'use client';

import { Candidate } from '@/types';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import Slider from 'react-slick';

const mock = [
	{
		avatar:
			'https://res.cloudinary.com/mashafrancis/image/upload/v1691349527/talantakazi/tyler-nix-sh3LSNbyj7k-unsplash.jpg',
		feedback:
			'An Administrative who constantly applies administration ideas toward the creation of a bigger profit margin. Adept at training and developing administration professionals, discussing office administration issues with larger customers and working with other executives to improve the customer experience. Purpose creating organizational success and bettering brand reputation through serving customers. Considered a value creator who operates ahead of the curve to promote customer satisfaction.',
		name: 'Martha',
		title: 'Customer service executive',
	},
	{
		avatar:
			'https://res.cloudinary.com/mashafrancis/image/upload/v1691349531/talantakazi/prince-akachi-l3IHXOdMyHQ-unsplash.jpg',
		feedback:
			'Am a competent, ambitious and self- motivated person with excellent communication and interpersonal skills, I sets goals and through hard work achieve them. Having attained excellent combination of good leadership and organizational skills I can lead in any situation that presents itself. Always ensure that I achieve my best. Being an organizer, fast learner and a team player, I consider options with an open mind before arriving at conclusions.',
		name: 'Margaret',
		title: 'Business development',
	},
	{
		avatar:
			'https://res.cloudinary.com/mashafrancis/image/upload/v1691349516/talantakazi/elizeu-dias-2EGNqazbAMk-unsplash.jpg',
		feedback:
			'I am a driver and i also have cars for hire. I am located in Eldoret and my prices are fair.',
		name: 'Douglas',
		title: 'Driver - Cars and ight vans',
	},
	{
		avatar:
			'https://res.cloudinary.com/mashafrancis/image/upload/v1691349524/talantakazi/prince-akachi-4Yv84VgQkRM-unsplash.jpg',
		feedback:
			'I am a driver and i also have cars for hire. I am located in Eldoret and my prices are fair.',
		name: 'Douglas',
		title: 'Driver - Cars and ight vans',
	},
];

export default function BannerProfessionals() {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const data: Candidate[] = [];
	// @ts-ignore
	const candidates: Candidate[] = data?.slice(0, 3);

	const sliderOpts = {
		arrows: isMd,
		dots: !isMd,
		infinite: true,
		slidesToScroll: 1,
		slidesToShow: isMd ? 3 : 1,
		speed: 500,
	};

	return (
		<Box
			sx={{
				'&::after': {
					backgroundImage: `radial-gradient(${alpha(
						theme.palette.primary.dark,
						0.4
					)} 20%, transparent 20%)`,
					backgroundSize: '18px 18px',
					content: '""',
					height: '100%',
					opacity: 0.2,
					position: 'absolute',
					right: 0,
					top: 0,
					width: '30%',
					zIndex: 1,
				},
				position: 'relative',
			}}
		>
			<Box position='relative' zIndex={2}>
				<Box marginBottom={4}>
					<Typography
						variant='h4'
						align='center'
						gutterBottom
						sx={{
							fontWeight: 700,
							marginTop: theme.spacing(1),
						}}
					>
						Take a look what our latest talent
					</Typography>
					<Box marginTop={2} display='flex' justifyContent='flex-end'>
						<Button
							color='primary'
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
							View all professionals
						</Button>
					</Box>
				</Box>
				<Box
					sx={{
						'& .slick-list, & .slick-slider, & .slick-track, & .slick-slide > div':
							{
								height: { md: 1, xs: 'auto' },
							},
						'& .slick-prev': {
							marginLeft: theme.spacing(-7),
						},
						'& .slick-prev, & .slick-next': {
							bottom: 0,
							left: '100%',
							height: 32,
							marginLeft: theme.spacing(-2),
							'&:before': {
								color: 'primary.main',
								fontSize: 32,
							},
							right: 0,
							top: '100%',
							zIndex: 2,
							transform: `translate(-100%, calc(-100% - ${theme.spacing(2)}))`,
							width: 32,
						},
						'& .slick-slide img': {
							objectFit: 'cover',
						},
						height: { md: 1, xs: 'auto' },
					}}
				>
					<Slider {...sliderOpts}>
						{mock.map((item, i) => (
							<Box key={i} paddingX={1}>
								<Box
									width={1}
									height={1}
									data-aos={'fade-up'}
									data-aos-delay={i * 100}
									data-aos-offset={100}
									data-aos-duration={600}
									component={Card}
									display={'flex'}
									flexDirection={'column'}
									alignItems={'center'}
									boxShadow={0}
									variant={'outlined'}
									borderRadius={2}
								>
									<CardContent
										sx={{
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<Box sx={{ paddingBottom: 2 }}>
											<ListItem
												component='div'
												disableGutters
												sx={{ padding: 0 }}
											>
												<ListItemAvatar sx={{ marginRight: 3 }}>
													<Avatar
														src={item.avatar}
														variant={'rounded'}
														sx={{
															borderRadius: 2,
															height: 100,
															width: 100,
														}}
													/>
												</ListItemAvatar>
												<ListItemText
													sx={{
														margin: 0,
													}}
													primary={item.name}
													secondary={item.title}
												/>
											</ListItem>
										</Box>
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
											{item.feedback}
										</Typography>
									</CardContent>
								</Box>
							</Box>
						))}
					</Slider>
				</Box>
			</Box>
		</Box>
	);
}
