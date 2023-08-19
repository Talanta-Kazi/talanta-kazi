import RegisterForm from '@/app/(auth)/register/register-form';
import { StyledGrid } from '@/app/(auth)/styles';
import Container from '@/components/container';
import { Box, Grid } from '@mui/material';

export default function Register(): JSX.Element {
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
				<Grid container spacing={6}>
					<Grid
						item
						container
						alignItems='center'
						justifyContent='center'
						xs={12}
						md={6}
					>
						<RegisterForm />
					</Grid>
					<StyledGrid item container justifyContent='center' xs={12} md={6}>
						<Box height={1} width={1} maxWidth={500}>
							<Box
								component='img'
								src='/img/register.svg'
								width={1}
								height={1}
								// sx={{
								// 	filter:
								// 		theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
								// }}
							/>
						</Box>
					</StyledGrid>
				</Grid>
			</Container>
		</Box>
	);
}
