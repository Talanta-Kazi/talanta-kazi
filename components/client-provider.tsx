'use client';

import { SessionProvider } from 'next-auth/react';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { SWRConfig } from 'swr';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorBoundary } from '@/components/error-boundary';
import ErrorBoundaryPage from '@/components/error-boundary-page';
import { ComponentProvider } from '@/context/ComponentContext';
import Paper from '@mui/material/Paper';
import SnackBar from '@/components/snack-bar';
import AOS from 'aos';
import getTheme from 'components/theme-registry/theme';
import { PaletteMode } from '@mui/material';
import ThemeRegistry from '@/components/theme-registry';

export const ColorModeContext = createContext({
	toggleColorMode: () => {},
});

export function ClientProvider({ children }: { children: ReactNode }) {
	const [mode, setMode] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}

		AOS.init({
			once: true,
			delay: 50,
			duration: 500,
			easing: 'ease-in-out',
		});
	}, []);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[],
	);

	const theme = useMemo(() => getTheme(mode as PaletteMode), [mode]);
	const snack = useSelector((store: RootState) => store.snack);

	return (
		<SessionProvider>
			<AnimatePresence
				mode='wait'
				initial={false}
				onExitComplete={() => window.scrollTo(0, 0)}
			>
				<motion.div
					initial={{ x: 300, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: 300, opacity: 0 }}
					transition={{
						type: 'spring',
						stiffness: 260,
						damping: 20,
					}}
				>
					<SWRConfig
						value={{
							refreshInterval: 3000,
							fetcher: (resource, init) =>
								fetch(resource, init).then((res) => res.json()),
						}}
					>
						<ThemeRegistry>
							<ColorModeContext.Provider value={colorMode}>
								<ErrorBoundary
									FallbackComponent={ErrorBoundaryPage}
									onReset={() => window.location.replace('/')}
								>
									<ComponentProvider>
										<Paper elevation={0}>{children}</Paper>
										<SnackBar snack={snack} />
									</ComponentProvider>
								</ErrorBoundary>
							</ColorModeContext.Provider>
						</ThemeRegistry>
					</SWRConfig>
				</motion.div>
			</AnimatePresence>
		</SessionProvider>
	);
}
