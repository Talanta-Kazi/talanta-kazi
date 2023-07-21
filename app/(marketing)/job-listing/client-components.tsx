'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function JobListingImage() {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Box
			component='img'
			src='/img/jobs-listing.svg'
			width={1}
			height={1}
			sx={{
				filter: theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
			}}
		/>
	);
}
