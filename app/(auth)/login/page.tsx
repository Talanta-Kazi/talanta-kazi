'use client';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@/components/container';
import AuthForm from '@/components/forms/auth-form';

const Login = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Box
			position={'relative'}
			minHeight={`calc(100vh - ${isMd ? '247px - 56px' : '300px - 63px'})`}
			display={'flex'}
			alignItems={'center'}
			justifyContent={'center'}
			height={'100%'}
		>
			<Container maxWidth={400}>
				<AuthForm />
			</Container>
		</Box>
	);
};

export default Login;
