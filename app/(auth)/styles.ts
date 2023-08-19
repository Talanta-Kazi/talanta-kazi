'use client';

import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledGrid = styled(Grid)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
}));
