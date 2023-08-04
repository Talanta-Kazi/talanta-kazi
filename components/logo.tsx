import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Link from 'next/link';
import logo from '../public/img/logo.png';
import Image from 'next/image';

const Logo = () => {
	return (
		<Box
			component={Link}
			href={'/'}
			role='presentation'
			sx={{
				display: 'flex',
				cursor: 'pointer',
				alignItems: 'center',
			}}
		>
			<Image src={logo} alt='...' width={96} height={96} className='h-8 w-8' />
			<Typography
				variant='h6'
				color='textPrimary'
				style={{
					fontWeight: 600,
				}}
			>
				Talanta Kazi
			</Typography>
		</Box>
	);
};

export default Logo;
