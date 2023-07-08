import { LocalGroceryStore, Menu } from '@mui/icons-material';
import {
	Avatar,
	Badge,
	Box,
	Chip,
	IconButton,
	Tooltip,
	Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { signIn, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { fancyId } from '@/lib/utils';
import UserAvatar from '@/components/user-avatar';
import { mainLayoutNavigation } from '@/components/layouts/navigation';
import Logo from '@/components/logo';

interface Props {
	onSidebarOpen: () => void;
	handleContactModal: () => void;
	colorInvert?: boolean;
}

const Topbar = ({
	onSidebarOpen,
	handleContactModal,
	colorInvert = false,
}: Props): JSX.Element => {
	const [authByEmail, setAuthByEmail] = useState<boolean>(false);
	const [activeLink, setActiveLink] = useState('');
	const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
	const pathname = usePathname();

	useEffect(() => {
		setActiveLink(window && window.location ? pathname : '');

		if (pathname === '/') {
			setActiveLink('');
		}
	}, [pathname]);

	const { data: session, status } = useSession();

	const handleGoogleLogin = async () => {
		setIsGoogleLoading(true);
		await signIn('google');
		setIsGoogleLoading(false);
	};

	const renderStoreIcon = (): JSX.Element => (
		<Tooltip title='Check device activities'>
			<Button
				component={Link}
				href={'/cart'}
				size={'small'}
				variant={'outlined'}
				aria-label='Dark mode toggler'
				color='primary'
				sx={{
					borderRadius: 1,
					minWidth: 'auto',
					padding: 0.5,
					marginRight: 2,
					// borderColor: alpha(theme.palette.divider, 0.2),
				}}
			>
				<Badge
					// overlap="circular"
					// variant="dot"
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					color='secondary'
					badgeContent={0}
				>
					<LocalGroceryStore fontSize={'small'} color='primary' />
				</Badge>
			</Button>
		</Tooltip>
	);

	const renderAuthButtons = () => (
		<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
			{status === 'authenticated' ? (
				<UserAvatar />
			) : (
				<Link href='/login'>
					<Chip
						size='medium'
						label='Sign in'
						variant='outlined'
						color='primary'
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
				</Link>
			)}
		</Box>
	);

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
			width={1}
		>
			<Box sx={{ display: { xs: 'flex' } }} alignItems={'center'}>
				<Logo displayText />
			</Box>
			<Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
				{mainLayoutNavigation.map((page, index) => (
					<Box key={fancyId()} marginLeft={index === 0 ? 0 : 4}>
						<Link href={page.href}>
							<Typography
								color='primary'
								sx={{
									color:
										activeLink === page.href
											? 'primary.main'
											: 'text.secondary',
									cursor: 'pointer',
									'&:hover': {
										color: 'text.primary',
									},
								}}
							>
								{page.title}
							</Typography>
						</Link>
					</Box>
				))}
			</Box>

			<Box sx={{ display: 'flex', position: 'static' }} alignItems={'center'}>
				{renderStoreIcon()}
				{renderAuthButtons()}
				<Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
					<IconButton
						onClick={onSidebarOpen}
						aria-label='Menu'
						sx={{ padding: 0, margin: 0 }}
					>
						<Menu fontSize={'medium'} />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
};

export default Topbar;
