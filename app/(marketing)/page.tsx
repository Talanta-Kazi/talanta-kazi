'use client';

import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Container from '@/components/container';
import {
	Bookings,
	Hero,
	Reviews,
	Services,
} from '@/app/(marketing)/_components';

export default function MarketingPage() {
	return (
		<>
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
							'#c9ad24',
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
			<Container paddingY={{ xs: 2, sm: 4, md: 6 }}>
				<Services />
			</Container>
			<Box bgcolor='alternate.main'>
				<Container>
					<Bookings />
				</Container>
			</Box>
			<Box bgcolor='alternate.main'>
				<Container>
					<Reviews />
				</Container>
			</Box>
		</>
	);
}
