'use client';

import { KeyboardArrowUpRounded } from '@mui/icons-material';
import { AppBar, Box, Fab, useScrollTrigger, Zoom } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import type { MouseEvent, ReactElement, ReactNode } from 'react';

import { Topbar } from './components';
import Container from '@/components/container';

interface Props {
	children: ReactNode;
}

interface ScrollTopProps {
	window?: () => Window;
	children: ReactElement;
}

const ScrollTop = ({ window, children }: ScrollTopProps) => {
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
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
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
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
					top: 0,
					backgroundColor: trigger
						? 'hsla(0,0%,100%,.8)'
						: theme.palette.background.paper,
					backdropFilter: trigger ? 'blur(15px)' : 'none',
					borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				}}
				elevation={0}
			>
				<Container
					maxWidth={1}
					paddingY={{ xs: 2, md: 1 }}
					paddingX={{ xs: 1, md: 4 }}
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
