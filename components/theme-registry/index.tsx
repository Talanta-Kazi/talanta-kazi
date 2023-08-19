'use client';

import { createContext, useMemo, useState } from 'react';

import { NextAppDirEmotionCacheProvider } from '@/components/theme-registry/emotion-cache';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import getTheme from './theme';

export const ColorModeContext = createContext({
	toggleColorMode: () => {},
});

export default function ThemeRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	const [mode, setMode] = useState<'light' | 'dark'>('light');
	const theme = useMemo(() => getTheme(mode as PaletteMode), [mode]);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[]
	);

	return (
		<NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
			<ThemeProvider theme={theme}>
				<ColorModeContext.Provider value={colorMode}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					{children}
				</ColorModeContext.Provider>
			</ThemeProvider>
		</NextAppDirEmotionCacheProvider>
	);
}
