'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';

import UserAvatar from '@/components/user-avatar';
import { Button, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';

export default function AuthButtonLink() {
	const [activeLink, setActiveLink] = useState('');
	const pathname = usePathname();
	const { status } = useSession();

	useEffect(() => {
		setActiveLink(window && window.location ? pathname : '');

		if (pathname === '/') {
			setActiveLink('');
		}
	}, [pathname]);

	return status === 'authenticated' ? (
		<UserAvatar />
	) : (
		<Box sx={{ display: { md: 'flex', xs: 'none' } }}>
			<Button
				component={Link}
				href='/login'
				variant='text'
				color='inherit'
				sx={{
					'&:hover': {
						color: 'text.primary',
					},
					color: activeLink === '/login' ? 'secondary.main' : 'text.secondary',
					cursor: 'pointer',
				}}
			>
				Login
			</Button>
			<Divider sx={{ height: 28, m: 1 }} orientation='vertical' />
			<Button
				component={Link}
				href='/register'
				variant='text'
				color='inherit'
				sx={{
					'&:hover': {
						color: 'text.primary',
					},
					color:
						activeLink === '/register' ? 'secondary.main' : 'text.secondary',
					cursor: 'pointer',
					marginLeft: 2,
					paddingY: 0.5,
				}}
			>
				Sign up
			</Button>
		</Box>
	);
}
