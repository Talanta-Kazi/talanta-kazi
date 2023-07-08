import {Menu} from '@mui/icons-material';
import {Box, IconButton, Typography} from '@mui/material';
import {useSession} from 'next-auth/react';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';

import Link from 'next/link';
import {fancyId} from '@/lib/utils';
import {mainLayoutNavigation} from '@/components/layouts/navigation';
import Logo from '@/components/logo';
import AuthButtonLink from "@/components/auth-button-link";

interface Props {
	onSidebarOpen: () => void;
}

const Topbar = ({onSidebarOpen}: Props): JSX.Element => {
	const [activeLink, setActiveLink] = useState('');
	const pathname = usePathname();

	useEffect(() => {
		setActiveLink(window && window.location ? pathname : '');

		if (pathname === '/') {
			setActiveLink('');
		}
	}, [pathname]);

	const {data: session, status} = useSession();

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
			width={1}
		>
			<Box sx={{display: {xs: 'flex'}}} alignItems={'center'}>
				<Logo/>
			</Box>
			<Box sx={{display: {xs: 'none', md: 'flex'}}} alignItems={'center'}>
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

			<Box sx={{display: 'flex', position: 'static'}} alignItems={'center'}>
				<AuthButtonLink/>
				<Box sx={{display: {xs: 'flex', md: 'none'}}} alignItems={'center'}>
					<IconButton
						onClick={onSidebarOpen}
						aria-label='Menu'
						sx={{padding: 0, margin: 0}}
					>
						<Menu fontSize={'medium'}/>
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
};

export default Topbar;
