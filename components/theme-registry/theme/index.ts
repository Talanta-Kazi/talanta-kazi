import type { PaletteMode, Theme } from '@mui/material';
import { responsiveFontSizes } from '@mui/material';
import type { ComponentsOverrides } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

import { dark, light } from './palette';
import shadows from './shadows';
import { createTypography } from './typography';

const getTheme = (mode: PaletteMode): Theme =>
	responsiveFontSizes(
		createTheme({
			palette: mode === 'light' ? light : dark,
			shadows: shadows(mode),
			typography: createTypography(),
			zIndex: {
				appBar: 1200,
				drawer: 1300,
			},
			shape: {
				borderRadius: 6,
			},
			components: {
				MuiButton: {
					styleOverrides: {
						root: {
							fontWeight: 400,
							borderRadius: 5,
							paddingTop: 6,
							paddingBottom: 6,
						},
						containedSecondary: mode === 'light' ? { color: 'white' } : {},
					} as ComponentsOverrides['MuiButton'],
				},
				MuiDialog: {
					styleOverrides: {
						root: {
							zIndex: 1310,
						},
						paperFullScreen: {
							borderRadius: '0 !important',
						},
					},
				},
				MuiInputBase: {
					styleOverrides: {
						root: {
							borderRadius: 5,
						},
					} as ComponentsOverrides['MuiInputBase'],
				},
				MuiOutlinedInput: {
					styleOverrides: {
						root: {
							borderRadius: 5,
						},
						input: {
							borderRadius: 5,
						},
					} as ComponentsOverrides['MuiOutlinedInput'],
				},
				MuiCard: {
					styleOverrides: {
						root: {
							borderRadius: 8,
						},
					} as ComponentsOverrides['MuiCard'],
				},
			},
		}),
	);

export default getTheme;
