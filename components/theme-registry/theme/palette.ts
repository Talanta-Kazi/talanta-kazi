import { type PaletteMode } from '@mui/material';

export const light = {
	alternate: {
		dark: '#edf1f7',
		// main: '#f7f9fc',
		main: '#f8f9fa',
	},
	background: {
		default: '#ffffff',
		level2: '#f5f5f5',
		contrast: 'rgba(255, 255, 255, 0.12)',
		paper: '#ffffff',
		level1: '#ffffff',
		level3: '#62a1e81f',
	},
	cardShadow: 'rgba(23, 70, 161, .11)',
	common: {
		black: '#191414',
		white: '#EEEEEF',
	},
	divider: 'rgba(0, 0, 0, 0.12)',
	mode: 'light' as PaletteMode,
	primary: {
		contrastText: '#191414',
		dark: '#00b6c5',
		light: '#42ccd3',
		main: '#00c2cb',
		// contrastText: '#edf1f7',
	},
	secondary: {
		contrastText: '#edf1f7',
		dark: '#0f5ea7',
		light: '#138fdd',
		main: '#117ec9',
	},
	text: {
		primary: '#191414',
		secondary: '#646e73',
	},
};

export const dark = {
	alternate: {
		dark: '#151a30',
		main: '#1a2138',
	},
	background: {
		default: '#121212',
		level2: '#333',
		contrast: 'rgba(255, 255, 255, 0.12)',
		paper: '#121212',
		level1: '#2D3748',
		level3: '#62a1e81f',
	},
	cardShadow: 'rgba(0, 0, 0, .11)',
	common: {
		black: '#000',
		white: '#fff',
	},
	divider: 'rgba(255, 255, 255, 0.12)',
	mode: 'dark' as PaletteMode,
	primary: {
		contrastText: 'rgba(0, 0, 0, 0.87)',
		dark: '#c9ad24',
		light: '#ffff8b',
		main: '#ffde59',
		// main: '#318162',
		// light: '#62b18f',
		// dark: '#005438',
		// contrastText: '#fff',
	},
	secondary: {
		// light: '#ffe98d',
		// main: '#F9B75D',
		// dark: '#c3872e',
		contrastText: 'rgba(0, 0, 0, 0.87)',

		dark: '#c9ad24',

		light: '#ffff8b',

		main: '#ffde59',
	},
	text: {
		primary: '#EEEEEF',
		secondary: '#AEB0B4',
	},
};
