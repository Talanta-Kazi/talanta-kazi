'use client';

import { ReactNode, useEffect, useState } from 'react';

import { ErrorBoundary } from '@/components/error-boundary';
import ErrorBoundaryPage from '@/components/error-boundary-page';
import SnackBar from '@/components/snack-bar';
import ThemeRegistry from '@/components/theme-registry';
import { ComponentProvider } from '@/context/ComponentContext';
import useStore from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AOS from 'aos';
import { AnimatePresence, motion } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import { Provider as Balancer } from 'react-wrap-balancer';
import { SWRConfig } from 'swr';

export function ClientProvider({ children }: { children: ReactNode }) {
	const { snack } = useStore();
	const [queryClient] = useState(() => new QueryClient());

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}

		AOS.init({
			delay: 50,
			duration: 500,
			easing: 'ease-in-out',
			once: true,
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
					initial={{ opacity: 0, x: 300 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 300 }}
					transition={{
						damping: 20,
						stiffness: 260,
						type: 'spring',
					}}
				>
					<SWRConfig
						value={{
							fetcher: (resource, init) =>
								fetch(resource, init).then((res) => res.json()),
							refreshInterval: 3000,
						}}
					>
						<QueryClientProvider client={queryClient}>
							<ThemeRegistry>
								<ErrorBoundary
									FallbackComponent={ErrorBoundaryPage}
									onReset={() => window.location.replace('/')}
								>
									<ComponentProvider>
										<Balancer>{children}</Balancer>
										<SnackBar snack={snack} />
									</ComponentProvider>
								</ErrorBoundary>
							</ThemeRegistry>
						</QueryClientProvider>
					</SWRConfig>
				</motion.div>
			</AnimatePresence>
		</SessionProvider>
	);
}
