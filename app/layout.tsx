import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import '../assets/css/global.css';
import '@/assets/css/fonts.css';

import { fontMono, fontSans } from '@/lib/fonts';
import { ClientProvider } from '@/components/client-provider';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const metadata = {
	title: 'Staffscout',
	description: 'Where talent meets opportunity.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang='en'
			className={cn(
				'min-h-screen font-sans text-black',
				fontSans.variable,
				fontMono.variable,
			)}
			suppressHydrationWarning
		>
			<body className='antialiased'>
				<ClientProvider>{children}</ClientProvider>
			</body>
		</html>
	);
}
