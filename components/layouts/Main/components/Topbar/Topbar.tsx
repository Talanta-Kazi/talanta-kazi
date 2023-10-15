import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';

import AuthButtonLink from '@/components/auth-button-link';
import { MobileNav } from '@/components/layouts/Main/components';
import { mainLayoutNavigation } from '@/components/layouts/navigation';
import Logo from '@/components/logo';
import { fancyId } from '@/lib/utils';
import { Box, Typography } from '@mui/material';

const Topbar = (): JSX.Element => {
	const [activeLink, setActiveLink] = useState('');
	const pathname = usePathname();

	useEffect(() => {
		setActiveLink(window && window.location ? pathname : '');

		if (pathname === '/') {
			setActiveLink('');
		}
	}, [pathname]);

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
			width={1}
		>
			<Box sx={{ display: { xs: 'flex' } }} alignItems={'center'}>
				<Logo />
			</Box>
			<Box sx={{ display: { md: 'flex', xs: 'none' } }} alignItems={'center'}>
				{mainLayoutNavigation.map((page, index) => (
					<Box key={fancyId()} marginLeft={index === 0 ? 0 : 4}>
						<Link href={page.href}>
							<Typography
								color='primary'
								sx={{
									'&:hover': {
										color: 'text.primary',
									},
									color:
										activeLink === page.href
											? 'primary.main'
											: 'text.secondary',
									cursor: 'pointer',
								}}
							>
								{page.title}
							</Typography>
						</Link>
					</Box>
				))}
			</Box>

			<Box sx={{ display: 'flex', position: 'static' }} alignItems={'center'}>
				<AuthButtonLink />
				<MobileNav />
			</Box>
		</Box>
	);
};

export default Topbar;
