'use client';

import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Candidate } from '@/types';
import { fancyId, stripHtml } from '@/lib/utils';
import Avatar from '@mui/material/Avatar';

const mock = [
	{
		feedback:
			'An Administrative who constantly applies administration ideas toward the creation of a bigger profit margin. Adept at training and developing administration professionals, discussing office administration issues with larger customers and working with other executives to improve the customer experience. Purpose creating organizational success and bettering brand reputation through serving customers. Considered a value creator who operates ahead of the curve to promote customer satisfaction.',
		name: 'Martha',
		title: 'Customer service executive',
		avatar: 'https://assets.maccarianagency.com/avatars/img1.jpg',
	},
	{
		feedback:
			'Am a competent, ambitious and self- motivated person with excellent communication and interpersonal skills, I sets goals and through hard work achieve them. Having attained excellent combination of good leadership and organizational skills I can lead in any situation that presents itself. Always ensure that I achieve my best. Being an organizer, fast learner and a team player, I consider options with an open mind before arriving at conclusions.',
		name: 'Margaret',
		title: 'Busines development',
		avatar: 'https://assets.maccarianagency.com/avatars/img2.jpg',
	},
	{
		feedback:
			'I am a driver and i also have cars for hire. I am located in Eldoret and my prices are fair.',
		name: 'Douglas',
		title: 'Driver - Cars and ight vans',
		avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
	},
];

function Reviews(): JSX.Element {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const data: Candidate[] = [];
	// @ts-ignore
	const candidates: Candidate[] = data?.slice(0, 3);

	return (
		<Box
			sx={{
				position: 'relative',
				'&::after': {
					position: 'absolute',
					content: '""',
					width: '30%',
					zIndex: 1,
					top: 0,
					right: 0,
					height: '100%',
					backgroundSize: '18px 18px',
					backgroundImage: `radial-gradient(${alpha(
						theme.palette.primary.dark,
						0.4,
					)} 20%, transparent 20%)`,
					opacity: 0.2,
				},
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
						Take a look what our latest candidates
					</Typography>
					<Box marginTop={2} display='flex' justifyContent='center'>
						<Button
							variant='contained'
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
							View all candidates
						</Button>
					</Box>
				</Box>
				<Grid container spacing={2}>
					{candidates?.map((item, i) => (
						<Grid item xs={12} md={4} key={fancyId()}>
							<Box
								width={1}
								height={1}
								data-aos='fade-up'
								data-aos-delay={i * 100}
								data-aos-offset={100}
								data-aos-duration={600}
								component={Card}
								display='flex'
								flexDirection='column'
								alignItems='center'
								boxShadow={0}
								variant='outlined'
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
													src='https://assets.maccarianagency.com/avatars/img1.jpg'
													variant='rounded'
													sx={{ width: 100, height: 100, borderRadius: 2 }}
												/>
											</ListItemAvatar>
											<ListItemText
												sx={{ margin: 0 }}
												primary={JSON.parse(item.personal).first_name}
												secondary={item.job_title}
											/>
										</ListItem>
									</Box>
									<Typography color='text.secondary'>
										{stripHtml(item.personal_statement)}
									</Typography>
								</CardContent>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
}

export default Reviews;
