import { type PaletteMode, type Theme } from '@mui/material';
import { responsiveFontSizes } from '@mui/material';
import { type ComponentsOverrides } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

import { dark, light } from './palette';
import shadows from './shadows';
import { createTypography } from './typography';

const getTheme = (mode: PaletteMode): Theme =>
	responsiveFontSizes(
		createTheme({
			components: {
				MuiButton: {
					styleOverrides: {
						containedSecondary: mode === 'light' ? { color: 'white' } : {},
						root: {
							borderRadius: 5,
							fontWeight: 400,
							paddingBottom: 6,
							paddingTop: 6,
						},
					} as ComponentsOverrides['MuiButton'],
				},
				MuiCard: {
					styleOverrides: {
						root: {
							borderRadius: 8,
						},
					} as ComponentsOverrides['MuiCard'],
				},
				MuiDialog: {
					styleOverrides: {
						paperFullScreen: {
							borderRadius: '0 !important',
						},
						root: {
							zIndex: 1310,
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
						input: {
							borderRadius: 5,
						},
						root: {
							borderRadius: 5,
						},
					} as ComponentsOverrides['MuiOutlinedInput'],
				},
			},
			palette: mode === 'light' ? light : dark,
			shadows: shadows(mode),
			shape: {
				borderRadius: 6,
			},
			typography: createTypography(),
			zIndex: {
				appBar: 1200,
				drawer: 1300,
			},
		})
	);

export default getTheme;
