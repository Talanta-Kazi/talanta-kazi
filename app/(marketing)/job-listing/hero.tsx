import {
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	InputBase,
	Paper,
	Typography,
} from '@mui/material';
import Container from '@/components/container';
import { Search } from '@mui/icons-material';
import { cn } from '@/lib/utils';
import { JobListingImage } from '@/app/(marketing)/job-listing/client-components';
import { alpha } from '@mui/material/styles';

interface HeroProps {
	handleSearchValue: (value: string) => void;
	totalJobsFiltered: number;
}

export default function Hero({
	handleSearchValue,
	totalJobsFiltered,
}: HeroProps) {
	return (
		<Box
			bgcolor='alternate.main'
			padding={{ xs: 2, md: 4 }}
			borderRadius={2}
			sx={{
				position: 'relative',
				'&::after': {
					position: 'absolute',
					content: '""',
					width: '30%',
					zIndex: 1,
					top: 0,
					left: '5%',
					height: '100%',
					backgroundSize: '16px 16px',
					backgroundImage: `radial-gradient(${alpha(
						'#c9ad24',
						0.4,
					)} 20%, transparent 20%)`,
					opacity: 0.2,
				},
			}}
		>
			<Box position={'relative'} zIndex={3}>
				<Container>
					<Grid container spacing={4}>
						<Grid
							item
							container
							xs={12}
							md={6}
							alignItems='center'
							sx={{ position: 'relative' }}
						>
							<Box className={cn()} marginBottom={4}>
								<Box marginBottom={2}>
									<Typography
										variant='h3'
										component='h3'
										sx={{
											fontWeight: 700,
										}}
									>
										Jobs board listing
									</Typography>
								</Box>
								<Box marginBottom={3}>
									<Typography variant='h6' component='p' color='text.secondary'>
										Productivity tools can either help you or get in the way.
									</Typography>
								</Box>

								<Paper
									component='form'
									noValidate
									autoComplete='off'
									sx={{
										p: '2px 4px',
										display: 'flex',
										alignItems: 'center',
										width: 'auto',
									}}
								>
									<IconButton sx={{ p: '10px' }} aria-label='menu'>
										<Search />
									</IconButton>
									<InputBase
										sx={{ ml: 1, flex: 1 }}
										placeholder='Search jobs'
										inputProps={{ 'aria-label': 'search google maps' }}
										onChange={({ target }) => handleSearchValue(target.value)}
									/>
									<Typography
										color='text.secondary'
										variant='subtitle2'
										sx={{ whiteSpace: 'nowrap' }}
									>
										{`${totalJobsFiltered} Job${
											totalJobsFiltered > 1 ? 's' : ''
										}`}
									</Typography>
									<Divider sx={{ height: 28, m: 1 }} orientation='vertical' />
									<Button
										sx={{
											height: 54,
											minWidth: 50,
											whiteSpace: 'nowrap',
										}}
										variant='contained'
										color='primary'
										size='medium'
									>
										Search
									</Button>
								</Paper>
							</Box>
						</Grid>
						<Grid item xs={12} md={6}>
							<Box height={1} width={1} display='flex' justifyContent='center'>
								<Box
									height={1}
									width={1}
									maxWidth={{ xs: 600, md: '100%' }}
									maxHeight={400}
								>
									<JobListingImage />
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Box>
	);
}
