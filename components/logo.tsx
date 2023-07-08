import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

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
			<Typography
				variant='h6'
				color='textPrimary'
				style={{
					fontWeight: 600,
					// fontSize: '1.45rem',
				}}
			>
				Talanta Kazi
			</Typography>
		</Box>
	);
};

export default Logo;
