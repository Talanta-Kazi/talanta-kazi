'use client';

/* eslint-disable react/no-unescaped-entities */
import Conditional from '@/components/conditional';
import dayjsTime from '@/lib/dayjsTime';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface Props {
	education?: any;
}

const mock = [
	{
		author: {
			name: 'Clara Bertoletti',
		},
		date: '04 Aug',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		image: 'https://assets.maccarianagency.com/backgrounds/img13.jpg',
		title: 'Lorem ipsum dolor sit amet',
	},
	{
		author: {
			name: 'Jhon Anderson',
		},
		date: '12 Sep',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		image: 'https://assets.maccarianagency.com/backgrounds/img14.jpg',
		title: 'Consectetur adipiscing elit',
	},
	{
		author: {
			name: 'Clara Bertoletti',
		},
		date: '04 Aug',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		image: 'https://assets.maccarianagency.com/backgrounds/img15.jpg',
		title: 'Lorem ipsum dolor sit amet',
	},
	{
		author: {
			name: 'Jhon Anderson',
		},
		date: '12 Sep',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		image: 'https://assets.maccarianagency.com/backgrounds/img16.jpg',
		title: 'Consectetur adipiscing elit',
	},
];

export default function Sidebar({ education }: Props) {
	const theme = useTheme();
	return (
		<Box component={Card} variant={'outlined'} padding={2}>
			<Typography
				variant='h6'
				data-aos={'fade-up'}
				sx={{
					fontWeight: 600,
					marginBottom: 2,
				}}
			>
				About
			</Typography>
			<Box paddingY={2}>
				<Divider />
			</Box>
			<Grid container spacing={2}>
				<Box
					component={Card}
					width={1}
					height={1}
					boxShadow={0}
					display={'flex'}
					flexDirection={'column'}
					sx={{ backgroundImage: 'none', bgcolor: 'transparent' }}
				>
					<CardContent
						sx={{ '&:last-child': { paddingBottom: 1 }, padding: 2 }}
					>
						<Typography
							variant='h6'
							sx={{
								fontWeight: 600,
								marginBottom: 1,
							}}
						>
							Education
						</Typography>
						<Conditional condition={!!education}>
							<Typography
								variant={'body1'}
								color={'text.secondary'}
								sx={{
									marginBottom: 1,
								}}
							>
								{education?.education[0].institution}
							</Typography>
							<Typography variant={'body1'} color={'text.secondary'}>
								{education?.education[0].course || 'No course'}
							</Typography>
							<Typography
								variant={'body2'}
								color={'text.secondary'}
								sx={{
									marginBottom: 2,
								}}
							>
								{dayjsTime(education?.education[0].from_date).format('YYYY')} -{' '}
								{dayjsTime(education?.education[0].to_date).format('YYYY')}
							</Typography>
						</Conditional>
					</CardContent>
				</Box>

				{/*{mock.map((item, i) => (*/}
				{/*	<Grid key={i} item xs={12}>*/}
				{/*		<Box*/}
				{/*			component={Card}*/}
				{/*			width={1}*/}
				{/*			height={1}*/}
				{/*			boxShadow={0}*/}
				{/*			display={'flex'}*/}
				{/*			flexDirection={{ xs: 'column', md: 'row' }}*/}
				{/*			sx={{ backgroundImage: 'none', bgcolor: 'transparent' }}*/}
				{/*		>*/}
				{/*			<Box*/}
				{/*				sx={{*/}
				{/*					width: { xs: 1, md: '50%' },*/}
				{/*					'& .lazy-load-image-loaded': {*/}
				{/*						height: 1,*/}
				{/*						display: 'flex !important',*/}
				{/*					},*/}
				{/*				}}*/}
				{/*			>*/}
				{/*				<Image*/}
				{/*					height={1}*/}
				{/*					width={1}*/}
				{/*					src={item.image}*/}
				{/*					alt='...'*/}
				{/*					// sx={{*/}
				{/*					// 	objectFit: 'cover',*/}
				{/*					// 	maxHeight: 120,*/}
				{/*					// 	borderRadius: 2,*/}
				{/*					// 	filter:*/}
				{/*					// 		theme.palette.mode === 'dark'*/}
				{/*					// 			? 'brightness(0.7)'*/}
				{/*					// 			: 'none',*/}
				{/*					// }}*/}
				{/*				/>*/}
				{/*			</Box>*/}
				{/*			<CardContent*/}
				{/*				sx={{ padding: 1, '&:last-child': { paddingBottom: 1 } }}*/}
				{/*			>*/}
				{/*				<Typography fontWeight={700}>{item.title}</Typography>*/}
				{/*				<Box marginY={1 / 4}>*/}
				{/*					<Typography*/}
				{/*						variant={'caption'}*/}
				{/*						color={'text.secondary'}*/}
				{/*						component={'i'}*/}
				{/*					>*/}
				{/*						{item.author.name} - {item.date}*/}
				{/*					</Typography>*/}
				{/*				</Box>*/}
				{/*				<Button size={'small'}>Read More</Button>*/}
				{/*			</CardContent>*/}
				{/*		</Box>*/}
				{/*	</Grid>*/}
				{/*))}*/}
			</Grid>
		</Box>
	);
}
