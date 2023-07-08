'use client';

import { KeyboardArrowUpRounded } from '@mui/icons-material';
import { AppBar, Box, Fab, useScrollTrigger, Zoom } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { MouseEvent, ReactElement, ReactNode } from 'react';

import { Footer, Topbar } from './components';
import Container from '@/components/container';

interface Props {
	children: ReactNode;
	bgcolor?: string;
}

interface AppBarOnScrollProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: ReactElement<any, any>;
	window?: () => Window;
	isMobileView?: boolean;
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

const Main = ({ children, bgcolor = 'transparent' }: Props): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return (
		<Box position={'relative'} minHeight={'100vh'}>
			<AppBar
				position={'sticky'}
				sx={{
					top: 0,
					backgroundColor: trigger ? 'hsla(0,0%,100%,.8)' : bgcolor,
					backdropFilter: trigger ? 'blur(15px)' : 'none',
					borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
					// borderBottom: trigger
					// 	? `1px solid ${alpha(theme.palette.divider, 0.1)}`
					// 	: 'none',
				}}
				elevation={trigger ? 1 : 0}
			>
				<Container
					maxWidth={1}
					paddingY={{ xs: 2, md: 1 }}
					paddingX={{ xs: 2, md: 4 }}
				>
					<Topbar />
				</Container>
			</AppBar>
			<div id='back-to-top-anchor' />
			<main style={{ paddingBottom: isMd ? '247px' : '300px' }}>
				{children}
			</main>
			<ScrollTop>
				<Fab color='secondary' size='small' aria-label='scroll back to top'>
					<KeyboardArrowUpRounded />
				</Fab>
			</ScrollTop>
			<Container
				maxWidth={1}
				paddingX={4}
				paddingY={8}
				sx={{
					backgroundColor: 'common.black',
					color: 'common.white',
					position: 'absolute',
					bottom: 0,
					height: isMd ? '247px' : '300px',
				}}
			>
				<Footer />
			</Container>
		</Box>
	);
};

export default Main;
