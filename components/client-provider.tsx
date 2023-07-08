'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import { SWRConfig } from 'swr';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorBoundary } from '@/components/error-boundary';
import ErrorBoundaryPage from '@/components/error-boundary-page';
import { ComponentProvider } from '@/context/ComponentContext';
import SnackBar from '@/components/snack-bar';
import AOS from 'aos';
import ThemeRegistry from '@/components/theme-registry';
import useStore from '@/store';

export function ClientProvider({ children }: { children: ReactNode }) {
	const store = useStore();

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
							<ErrorBoundary
								FallbackComponent={ErrorBoundaryPage}
								onReset={() => window.location.replace('/')}
							>
								<ComponentProvider>
									{children}
									<SnackBar snack={store.snack} />
								</ComponentProvider>
							</ErrorBoundary>
						</ThemeRegistry>
					</SWRConfig>
				</motion.div>
			</AnimatePresence>
		</SessionProvider>
	);
}
