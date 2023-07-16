import { ArrowBackRounded } from '@mui/icons-material';
import { Avatar, Chip, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import UserAvatar from '@/components/user-avatar';

const Topbar = (): JSX.Element => {
	const { push } = useRouter();
	const theme = useTheme();
	const { data: session } = useSession();

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
		>
			<Box
				sx={{ display: 'flex' }}
				alignItems={'center'}
				onClick={() => push('/')}
			>
				<IconButton style={{ marginRight: theme.spacing(1) }}>
					<ArrowBackRounded className='learn-more-link__arrow' />
				</IconButton>
				<Typography variant='body2' sx={{ cursor: 'pointer' }}>
					Home
				</Typography>
			</Box>
			<Box>
				{!!session ? (
					<UserAvatar />
				) : (
					<Chip
						size='medium'
						label='Login'
						variant='outlined'
						avatar={
							<Avatar
								alt={'Anonymous User'}
								src={'/img/avatar_male.svg'}
								aria-describedby='menu-popover'
								aria-controls='menu-popover'
								aria-haspopup='true'
								typeof='button'
							/>
						}
					/>
				)}
			</Box>
		</Box>
	);
};

export default Topbar;
