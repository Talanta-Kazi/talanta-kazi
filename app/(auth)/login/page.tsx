import { Box, Grid } from '@mui/material';
import Container from '@/components/container';
import { LoginForm } from '@/app/(auth)/login/login-form';
import { StyledGrid } from '@/app/(auth)/styles';

const Login = (): JSX.Element => {
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
					<StyledGrid item container justifyContent='center' xs={12} md={6}>
						<Box height={1} width={1} maxWidth={500}>
							<Box component='img' src='/img/login.svg' width={1} height={1} />
						</Box>
					</StyledGrid>
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
