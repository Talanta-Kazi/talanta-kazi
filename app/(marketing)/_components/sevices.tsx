/* eslint-disable react/no-unescaped-entities */
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

const mock = [
	{
		title: 'Built for home',
		subtitle:
			'Almond is built for use at the comfort of your home with little expense.',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				height='36px'
				viewBox='0 0 24 24'
				width='36px'
				fill='currentColor'
			>
				<path d='M0 0h24v24H0V0z' fill='none' />
				<path d='M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z' />
				<path d='M7 10.19V18h2v-6h6v6h2v-7.81l-5-4.5z' opacity='.3' />
			</svg>
		),
	},
	{
		title: 'Designed for space',
		subtitle:
			'Designed for limited space with no compromise of quality and quantity.',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				height='36px'
				viewBox='0 0 24 24'
				width='36px'
				fill='currentColor'
			>
				<path d='M0 0h24v24H0V0z' fill='none' />
				<circle cx='15.17' cy='9.17' opacity='.3' r='5' />
				<circle cx='4.5' cy='9.5' r='1.5' />
				<path d='M15.17 2.17c-3.87 0-7 3.13-7 7 0 3.47 2.52 6.34 5.83 6.89V20H6v-3h1v-4c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v4h1v5h16v-2h-3v-3.88c3.47-.41 6.17-3.36 6.17-6.95 0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z' />
			</svg>
		),
	},
	{
		title: 'Monitoring of growth',
		subtitle:
			'We have an intelligent engine to take care of the plant growth in the background.',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				height='36px'
				viewBox='0 0 24 24'
				width='36px'
				fill='currentColor'
			>
				<path d='M0 0h24v24H0V0z' fill='none' />
				<path d='M18 10h4v7h-4z' opacity='.3' />
				<path d='M23 8h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7zM4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6z' />
			</svg>
		),
	},
];

const Services = (): JSX.Element => {
	const theme = useTheme();
	return (
		<Box>
			<Box marginBottom={4}>
				{/*<Box marginBottom={2}>*/}
				{/*	<Typography*/}
				{/*		variant="h5"*/}
				{/*		color="text.primary"*/}
				{/*		align={'center'}*/}
				{/*		gutterBottom*/}
				{/*		sx={{*/}
				{/*			fontWeight: 600,*/}
				{/*		}}*/}
				{/*	>*/}
				{/*		Feed your family with ease*/}
				{/*	</Typography>*/}
				{/*	<Typography*/}
				{/*		variant="h6"*/}
				{/*		component="p"*/}
				{/*		color="text.secondary"*/}
				{/*		sx={{ fontWeight: 400 }}*/}
				{/*		align={'center'}*/}
				{/*	>*/}
				{/*		Our focus is on growing your food smart. We are a hydroponics*/}
				{/*		company that specializes in growing plants in a controlled*/}
				{/*		environment.*/}
				{/*	</Typography>*/}
				{/*</Box>*/}
			</Box>
			<Grid container spacing={2}>
				{mock.map((item, i) => (
					<Grid item xs={12} md={4} key={i}>
						<Box
							width={1}
							height={1}
							data-aos={'fade-up'}
							data-aos-delay={i * 100}
						>
							<Box
								display={'flex'}
								flexDirection={'column'}
								alignItems={'center'}
							>
								<Box
									component={Avatar}
									width={60}
									height={60}
									marginBottom={2}
									bgcolor={alpha(theme.palette.primary.main, 0.1)}
									color={theme.palette.primary.main}
								>
									{item.icon}
								</Box>
								<Typography
									variant={'h6'}
									gutterBottom
									sx={{ fontWeight: 500 }}
									align={'center'}
								>
									{item.title}
								</Typography>
								<Typography align={'center'} color='text.secondary'>
									{item.subtitle}
								</Typography>
							</Box>
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Services;
