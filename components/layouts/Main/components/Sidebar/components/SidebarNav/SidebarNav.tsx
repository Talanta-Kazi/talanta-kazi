import Container from '@/components/container';
import { PolicyTwoTone } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
	Avatar,
	Box,
	Button,
	Chip,
	Divider,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import packageJson from '../../../../../../../package.json';
import NavItem from './components/NavItem';
import Link from 'next/link';
import Logo from '@/components/logo';

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onClose: () => void;
	handleContactModal: () => void;
}

const SidebarNav = ({ onClose, handleContactModal }: Props): JSX.Element => {
	const router = useRouter();

	const { data: session } = useSession();

	const { name, image } = session?.user || {
		name: 'Anonymous User',
		image:
			'https://storage.googleapis.com/static.almondhydroponics.com/static/images/avatar_male.svg',
	};

	const handleLogin = () => router.push('/login');

	const logoutActiveUser = async (e: {
		preventDefault: () => void;
	}): Promise<void> => {
		e.preventDefault();
		await signOut({
			callbackUrl: `${window.location.origin}`,
			redirect: false,
		});
	};

	const renderAuthButtons = () => (
		<Box>
			<Button
				fullWidth
				variant='outlined'
				color='primary'
				size='medium'
				onClick={!!session ? logoutActiveUser : handleLogin}
			>
				{!!session ? 'Logout' : 'Account'}
			</Button>
		</Box>
	);

	const accountAvatar = () => {
		return (
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				spacing={2}
			>
				<Chip
					size='medium'
					label={name || 'Anonymous User'}
					variant='outlined'
					color='primary'
					avatar={
						<Avatar
							alt={name ?? 'Anonymous User'}
							src={
								image ??
								'https://storage.googleapis.com/static.almondhydroponics.com/static/images/avatar_male.svg'
							}
							aria-describedby='menu-popover'
							aria-controls='menu-popover'
							aria-haspopup='true'
							typeof='button'
						/>
					}
				/>
			</Stack>
		);
	};

	return (
		<Box>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				marginLeft={2}
			>
				{!!session ? accountAvatar() : <Logo displayText />}
				<Box display={'flex'} justifyContent={'flex-end'} onClick={onClose}>
					<IconButton>
						<CloseIcon fontSize='medium' />
					</IconButton>
				</Box>
			</Stack>
			<Box paddingX={2} paddingBottom={2}>
				<Box>
					<NavItem title={''} handleContactModal={handleContactModal} />
				</Box>
				<Divider sx={{ marginBottom: 2 }} />
				{renderAuthButtons()}
				<Box marginTop={2}>
					<Button
						variant='contained'
						color='primary'
						fullWidth
						component='a'
						target='blank'
						onClick={() => router.push('/store')}
					>
						Go to store
					</Button>
				</Box>
			</Box>
			<Container paddingY={2} sx={{ bottom: 0, position: 'fixed' }}>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					spacing={2}
				>
					<Button
						component={Link}
						href='company-terms'
						startIcon={<PolicyTwoTone />}
						sx={{ color: 'text.primary', paddingX: 0 }}
					>
						Legal
					</Button>
					<Typography variant={'caption'} fontWeight={300}>
						{`v${packageJson.version}`}
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
};

export default SidebarNav;
