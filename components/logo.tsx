import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

const darkLogo = '/logo.png';
const logo = '/logo.png';

interface Props {
	displayText?: boolean;
}

const Logo = ({ displayText = false }: Props): JSX.Element => {
	const {
		palette: { mode },
	} = useTheme();

	return (
		<Box
			component={Link}
			href={'/'}
			role='presentation'
			style={{ cursor: 'pointer' }}
		>
			<Stack
				direction='row'
				justifyContent='flex-start'
				alignItems='center'
				spacing={1}
			>
				<Box display={'flex'} title='almond' width={{ xs: 30, md: 36 }}>
					<Box
						component={'img'}
						src={mode === 'light' ? logo : darkLogo}
						alt='logo'
						height={1}
						width={1}
					/>
				</Box>
				{displayText && (
					<Typography
						variant='h5'
						color='textPrimary'
						style={{
							fontWeight: 500,
							fontSize: '1.45rem',
						}}
					>
						almond
					</Typography>
				)}
			</Stack>
		</Box>
	);
};

export default Logo;
