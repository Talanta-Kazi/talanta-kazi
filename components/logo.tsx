import Image from 'next/image';
import Link from 'next/link';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import logo from '../public/img/logo.png';

const Logo = () => {
	return (
		<Box
			component={Link}
			href={'/'}
			role='presentation'
			sx={{
				alignItems: 'center',
				cursor: 'pointer',
				display: 'flex',
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
