'use client';

import { type MouseEvent, type ReactElement, type ReactNode } from 'react';

import Container from '@/components/container';
import { KeyboardArrowUpRounded } from '@mui/icons-material';
import { AppBar, Box, Fab, Zoom, useScrollTrigger } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { Topbar } from './components';

interface Props {
	children: ReactNode;
}

interface ScrollTopProps {
	window?: () => Window;
	children: ReactElement;
}

const ScrollTop = ({ window, children }: ScrollTopProps) => {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		target: window ? window() : undefined,
		threshold: 100,
	});

	const handleClick = (event: MouseEvent<HTMLDivElement>) => {
		const anchor = (
			(event.target as HTMLDivElement).ownerDocument || document
		).querySelector('#back-to-top-anchor');

		if (anchor) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};

	return (
		<Zoom in={trigger}>
			<Box
				onClick={handleClick}
				role='presentation'
				sx={{ bottom: 16, position: 'fixed', right: 16 }}
			>
				{children}
			</Box>
		</Zoom>
	);
};

const Minimal = ({ children }: Props): JSX.Element => {
	const theme = useTheme();

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return (
		<Box position={'relative'} minHeight={'100vh'} bgcolor={'alternate.main'}>
			<AppBar
				position={'sticky'}
				sx={{
					backdropFilter: trigger ? 'blur(15px)' : 'none',
					backgroundColor: trigger
						? 'hsla(0,0%,100%,.8)'
						: theme.palette.background.paper,
					borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
					top: 0,
				}}
				elevation={0}
			>
				<Container
					maxWidth={1}
					paddingY={{ md: 1, xs: 2 }}
					paddingX={{ md: 4, xs: 1 }}
				>
					<Topbar />
				</Container>
			</AppBar>
			<div id='back-to-top-anchor' />
			<main>{children}</main>
			<ScrollTop>
				<Fab color='secondary' size='small' aria-label='scroll back to top'>
					<KeyboardArrowUpRounded />
				</Fab>
			</ScrollTop>
		</Box>
	);
};

export default Minimal;
