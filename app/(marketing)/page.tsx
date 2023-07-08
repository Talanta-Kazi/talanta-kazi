'use client';

import { Suspense } from 'react';
import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import Container from '@/components/container';
import { Hero, Places, Services } from '@/app/(marketing)/_components';

export default function MarketingPage() {
	const theme = useTheme();

	return (
		<Suspense fallback={null}>
			<Box
				bgcolor={'alternate.main'}
				sx={{
					position: 'relative',
					'&::after': {
						position: 'absolute',
						content: '""',
						width: '30%',
						zIndex: 1,
						top: 0,
						left: '5%',
						height: '100%',
						backgroundSize: '16px 16px',
						backgroundImage: `radial-gradient(${alpha(
							theme.palette.primary.dark,
							0.4,
						)} 20%, transparent 20%)`,
						opacity: 0.2,
					},
				}}
			>
				<Box position={'relative'} zIndex={3}>
					<Hero />
				</Box>
			</Box>
			<Container>
				<Services />
			</Container>
			<Box
				sx={{
					backgroundImage: `linear-gradient(to bottom, ${alpha(
						theme.palette.background.paper,
						0,
					)}, ${alpha(theme.palette.alternate.main, 1)} 100%)`,
					backgroundRepeat: 'repeat-x',
					position: 'relative',
				}}
			>
				<Container>
					<Places />
				</Container>
			</Box>
		</Suspense>
	);
}
