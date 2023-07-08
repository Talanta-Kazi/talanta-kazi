import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Button, Typography } from '@mui/material';

const GetStarted = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Box>
			<Typography
				variant='h4'
				color='text.primary'
				align={'center'}
				gutterBottom
				sx={{
					fontWeight: 700,
				}}
			>
				Get started with almond today
			</Typography>
			<Typography
				variant='h6'
				component='p'
				color='text.secondary'
				sx={{ fontWeight: 400 }}
				align={'center'}
			>
				Take control of your food and what you eat
			</Typography>
			<Box
				display='flex'
				flexDirection={{ xs: 'column', sm: 'row' }}
				alignItems={{ xs: 'stretched', sm: 'flex-start' }}
				justifyContent={'center'}
				marginTop={4}
			>
				<Button
					component={'a'}
					variant='contained'
					color='primary'
					size='large'
					fullWidth={!isMd}
					href={'/home'}
				>
					View store
				</Button>
				<Box
					marginTop={{ xs: 2, sm: 0 }}
					marginLeft={{ sm: 2 }}
					width={{ xs: '100%', md: 'auto' }}
				>
					<Button
						component={'a'}
						href={'/docs/introduction'}
						variant='outlined'
						color='primary'
						size='large'
						fullWidth={!isMd}
					>
						Resources
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default GetStarted;
