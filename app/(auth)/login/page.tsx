'use client';

import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@/components/container';
import { LoginForm } from '@/app/(auth)/login/login-form';

const Login = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Box
			position='relative'
			minHeight='calc(100vh - 247px)'
			display='flex'
			alignItems='center'
			justifyContent='center'
			height={1}
			marginTop={-12}
			paddingTop={12}
		>
			<Container>
				<Grid container spacing={4}>
					{isMd ? (
						<Grid item container justifyContent='center' xs={12} md={6}>
							<Box height={1} width={1} maxWidth={500}>
								<Box
									component='img'
									src='/img/login.svg'
									width={1}
									height={1}
									sx={{
										filter:
											theme.palette.mode === 'dark'
												? 'brightness(0.8)'
												: 'none',
									}}
								/>
							</Box>
						</Grid>
					) : null}
					<Grid
						item
						container
						alignItems='center'
						justifyContent='center'
						xs={12}
						md={5}
					>
						<LoginForm />
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Login;
