import type { PaletteMode } from '@mui/material';

export const light = {
	alternate: {
		// main: '#f7f9fc',
		main: '#f8f9fa',
		dark: '#edf1f7',
	},
	cardShadow: 'rgba(23, 70, 161, .11)',
	common: {
		black: '#191414',
		white: '#EEEEEF',
	},
	mode: 'light' as PaletteMode,
	primary: {
		main: '#00c2cb',
		light: '#42ccd3',
		dark: '#00b6c5',
		contrastText: '#191414',
		// contrastText: '#edf1f7',
	},
	secondary: {
		light: '#138fdd',
		main: '#117ec9',
		dark: '#0f5ea7',
		contrastText: '#edf1f7',
	},
	text: {
		primary: '#191414',
		secondary: '#646e73',
	},
	divider: 'rgba(0, 0, 0, 0.12)',
	background: {
		paper: '#ffffff',
		default: '#ffffff',
		level3: '#62a1e81f',
		level2: '#f5f5f5',
		level1: '#ffffff',
		contrast: 'rgba(255, 255, 255, 0.12)',
	},
};

export const dark = {
	alternate: {
		main: '#1a2138',
		dark: '#151a30',
	},
	cardShadow: 'rgba(0, 0, 0, .11)',
	common: {
		black: '#000',
		white: '#fff',
	},
	mode: 'dark' as PaletteMode,
	primary: {
		main: '#ffde59',
		light: '#ffff8b',
		dark: '#c9ad24',
		contrastText: 'rgba(0, 0, 0, 0.87)',
		// main: '#318162',
		// light: '#62b18f',
		// dark: '#005438',
		// contrastText: '#fff',
	},
	secondary: {
		main: '#ffde59',
		light: '#ffff8b',
		dark: '#c9ad24',
		// light: '#ffe98d',
		// main: '#F9B75D',
		// dark: '#c3872e',
		contrastText: 'rgba(0, 0, 0, 0.87)',
	},
	text: {
		primary: '#EEEEEF',
		secondary: '#AEB0B4',
	},
	divider: 'rgba(255, 255, 255, 0.12)',
	background: {
		paper: '#121212',
		default: '#121212',
		level3: '#62a1e81f',
		level2: '#333',
		level1: '#2D3748',
		contrast: 'rgba(255, 255, 255, 0.12)',
	},
};
