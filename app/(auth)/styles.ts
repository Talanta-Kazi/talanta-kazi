'use client';

import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const StyledGrid = styled(Grid)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
}));
