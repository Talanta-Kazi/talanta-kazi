import Container from '@/components/container';
import { Replay } from '@mui/icons-material';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ErrorBoundaryPage = ({ error, resetErrorBoundary }: any): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Box
			bgcolor={theme.palette.alternate.main}
			position={'relative'}
			minHeight={'100vh'}
			display={'flex'}
			alignItems={'center'}
			justifyContent={'center'}
			height={1}
		>
			<Container maxWidth={{ md: 720, sm: 720 }}>
				<Typography
					variant='body1'
					component='p'
					color='text.secondary'
					align='left'
				>
					Oops! Seems there is a bug on the page you were viewing. Please try
					reload the application or you can report this to the talanta kazi{' '}
					<Link href='mailto:noreply@talantakazi.com' underline='none'>
						here.
					</Link>
				</Typography>
				<Divider sx={{ marginY: 3 }} />
				<Typography component='p' variant='body1'>
					Error :
				</Typography>
				<Typography component='p' variant='body1' color='error'>
					{error.message}
				</Typography>
				<Box
					marginTop={4}
					display={'flex'}
					justifyContent={{ md: 'flex-start', xs: 'center' }}
				>
					<Button
						variant='contained'
						color='primary'
						startIcon={<Replay />}
						onClick={resetErrorBoundary}
					>
						Try again
					</Button>
				</Box>
			</Container>
		</Box>
	);
};

export default ErrorBoundaryPage;
