'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextAppDirEmotionCacheProvider } from '@/components/theme-registry/emotion-cache';
import { useMemo, useState } from 'react';
import getTheme from './theme';
import { PaletteMode } from '@mui/material';

export default function ThemeRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	const [mode, setMode] = useState<'light' | 'dark'>('light');
	const theme = useMemo(() => getTheme(mode as PaletteMode), [mode]);

	return (
		<NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				{children}
			</ThemeProvider>
		</NextAppDirEmotionCacheProvider>
	);
}
