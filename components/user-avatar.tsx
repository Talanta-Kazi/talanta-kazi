import { usePathname, useRouter } from 'next/navigation';

import { type MouseEvent } from 'react';
import { Fragment, useContext, useState } from 'react';

import { ComponentContext } from '@/context/ComponentContext';
import { fancyId } from '@/lib/utils';
import {
	AccountCircleOutlined,
	AdminPanelSettingsTwoTone,
	AllOutTwoTone,
	CodeTwoTone,
	FaceTwoTone,
	HelpOutline,
	Logout,
	OpenInNew,
} from '@mui/icons-material';
import { type Theme } from '@mui/material';
import {
	Avatar,
	Button,
	Chip,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	Tooltip,
	useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { signOut, useSession } from 'next-auth/react';

const UserAvatar = (): JSX.Element => {
	const { push } = useRouter();
	const pathname = usePathname();
	const theme = useTheme();
	const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { data: session } = useSession();
	const { setCurrentRoleBasedAccess, currentRoleBasedAccess = 'USER' } =
		useContext(ComponentContext);

	const profilePic = localStorage.getItem('profile_pic');

	const { username, image, role } = session?.user || {
		image: profilePic || '/img/avatar_male.svg',
		username: 'Anonymous User',
	};

	const handleToggleProfileMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleProfileClose = () => setAnchorEl(null);

	const { toggleRoleChangeDialog } = useContext(ComponentContext);

	const logoutActiveUser = async (): Promise<void> => {
		await signOut({
			callbackUrl: `${window.location.origin}`,
			redirect: false,
		});
		// await router.push('/');
	};

	const almondRoles = [
		{ icon: <FaceTwoTone fontSize='small' />, name: 'USER' },
		{ icon: <AdminPanelSettingsTwoTone fontSize='small' />, name: 'ADMIN' },
		{ icon: <CodeTwoTone fontSize='small' />, name: 'DEVELOPER' },
	];

	const roleSwitch = (role: string) => {
		switch (role) {
			case 'USER':
				return '/dashboard';
			case 'ADMIN':
				return '/admin';
			case 'DEVELOPER':
				return '/admin';
			default:
				return '/dashboard';
		}
	};

	const open = Boolean(anchorEl);

	const authedRoutes = pathname.includes('/dashboard' || '/admin');

	const menuItems = [
		{
			icon: <AllOutTwoTone fontSize='small' color='action' />,
			link: '/candidate/jobs',
			name: 'Dashboard',
			secondaryText: 'Manage your space',
		},
		{
			icon: <AccountCircleOutlined fontSize='small' color='action' />,
			link: 'account',
			name: 'Profile',
			secondaryText: 'All about you',
		},
		{
			icon: <HelpOutline fontSize='small' color='action' />,
			link: 'help',
			name: 'Help',
			secondaryText: 'Find support',
		},
		{
			icon: <OpenInNew fontSize='small' color='action' />,
			link: 'send-feedback',
			name: 'Feedback',
			secondaryText: 'Help improve our service',
		},
	];

	return (
		<Fragment>
			<Tooltip title={username ?? 'Anonymous User'}>
				{isSm ? (
					<Avatar
						onClick={handleToggleProfileMenu}
						alt={username || 'Anonymous User'}
						src={
							profilePic ||
							'https://res.cloudinary.com/mashafrancis/image/upload/v1670917120/musings/illustrations/avatar.svg'
						}
						aria-describedby='menu-popover'
						aria-controls='menu-popover'
						aria-haspopup='true'
						typeof='button'
						variant='rounded'
						sx={{
							height: 32,
							width: 32,
						}}
					/>
				) : (
					<Chip
						size='medium'
						label={username || 'Anonymous User'}
						variant='outlined'
						onClick={handleToggleProfileMenu}
						avatar={
							<Avatar
								alt={username || 'Anonymous User'}
								src={
									profilePic ||
									'https://res.cloudinary.com/mashafrancis/image/upload/v1670917120/musings/illustrations/avatar.svg'
								}
								aria-describedby='menu-popover'
								aria-controls='menu-popover'
								aria-haspopup='true'
								typeof='button'
								referrer-policy='no-referrer'
							/>
						}
					/>
				)}
			</Tooltip>
			<Menu
				id='menu-popover'
				anchorEl={anchorEl}
				open={open}
				onClose={handleProfileClose}
				onClick={handleProfileClose}
				PaperProps={{
					elevation: 0,
					sx: {
						'& .MuiAvatar-root': {
							height: 32,
							ml: -0.5,
							mr: 1,
							width: 32,
						},
						border: `0.6px solid ${alpha(theme.palette.divider, 0.3)}`,
						maxWidth: '100%',
						// filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,

						overflow: 'visible',

						width: 270,

						zIndex: theme.zIndex.appBar + 1,
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{role === 'EMPLOYER' && (
					<MenuItem
						key={fancyId()}
						sx={{
							borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
							paddingY: 1,
						}}
					>
						<Stack
							direction='row'
							justifyContent='center'
							alignItems='center'
							spacing={2}
							width={1}
						>
							{almondRoles.map((role) => {
								const handleClick = async () => {
									await push(roleSwitch(role.name));
									setCurrentRoleBasedAccess(role.name);
								};
								return (
									<Tooltip key={role.name} title={role.name.toLowerCase()}>
										<Button
											onClick={handleClick}
											variant={
												currentRoleBasedAccess === role.name && role.name
													? 'contained'
													: 'outlined'
											}
											aria-label={role.name}
											sx={{
												borderRadius: 1,
												minWidth: 'auto',
												// borderColor: alpha(theme.palette.divider, 0.2),
											}}
										>
											{role.icon}
										</Button>
									</Tooltip>
								);
							})}
						</Stack>
					</MenuItem>
				)}
				{menuItems.map((item) => {
					const handleClick = async () => {
						handleProfileClose();
						await push(item.link);
					};
					return (
						<MenuItem
							key={fancyId()}
							onClick={handleClick}
							sx={{
								borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
								paddingY: 1,
							}}
						>
							<ListItemIcon sx={{ marginRight: 1, minWidth: 44 }}>
								<Avatar
									sx={{
										backgroundColor: alpha(theme.palette.primary.main, 0.3),
										borderRadius: 1,
										color: theme.palette.primary.main,
									}}
								>
									{item.icon}
								</Avatar>
							</ListItemIcon>
							<ListItemText
								primary={item.name}
								secondary={item.secondaryText}
							/>
						</MenuItem>
					);
				})}

				<MenuItem
					onClick={logoutActiveUser}
					sx={{
						paddingY: 1,
					}}
				>
					<ListItemIcon sx={{ marginRight: 1, minWidth: 44 }}>
						<Avatar
							sx={{
								backgroundColor: alpha(theme.palette.primary.main, 0.3),
								borderRadius: 1,
								color: theme.palette.primary.main,
							}}
						>
							<Logout fontSize='small' color='action' />
						</Avatar>
					</ListItemIcon>
					<ListItemText primary='Logout' secondary='Heading back home' />
				</MenuItem>
			</Menu>
		</Fragment>
	);
};

export default UserAvatar;
