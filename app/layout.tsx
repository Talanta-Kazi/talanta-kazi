import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import '@/assets/css/global.css';
import '@/assets/css/fonts.css';

import { fontMono, fontSans } from '@/lib/fonts';
import { ClientProvider } from '@/components/client-provider';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import StoreProvider from '@/components/store-provider';

export const metadata = {
	title: 'Almond Hydroponics - Growing your plants smart',
	description:
		'We design sustainable solutions for hydroponic farmers, empowering them to grow fresh, clean, and local food in their communities around the globe.',
};

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
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
				<StoreProvider>
					<ClientProvider>
						{children}
					</ClientProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
