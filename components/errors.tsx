'use client';

import Link from 'next/link';

import Container from '@/components/container';
import { Main } from '@/components/layouts';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export function NotFoundPage() {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Main>
			<Box
				bgcolor={theme.palette.alternate.main}
				position={'relative'}
				minHeight={`calc(100vh - ${isMd ? '247px - 56px' : '300px - 63px'})`}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				height={'100%'}
			>
				<Container>
					<Typography variant='h2' align='center' fontWeight={600}>
						Oops!
					</Typography>
					<Typography variant='h4' align='center'>
						This is most likely not where you wanted to be.
					</Typography>
					<Box marginTop={4} display={'flex'} justifyContent='center'>
						<Button
							component={Link}
							href={'/'}
							variant='contained'
							color='primary'
							size='large'
							startIcon={<ArrowBack />}
						>
							Return to home
						</Button>
					</Box>
				</Container>
			</Box>
		</Main>
	);
}
