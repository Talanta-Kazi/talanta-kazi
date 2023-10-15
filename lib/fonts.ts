import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const fontSans = localFont({
	display: 'swap',
	src: [
		{
			path: '../assets/fonts/CircularStd-Book.woff2',
			style: 'normal',
			weight: '400',
		},
		{
			path: '../assets/fonts/CircularStd-Book.woff2',
			style: 'normal',
			weight: '500',
		},
		{
			path: '../assets/fonts/CircularStd-Book.woff2',
			style: 'normal',
			weight: '600',
		},
		{
			path: '../assets/fonts/CircularStd-Bold.woff2',
			style: 'normal',
			weight: '700',
		},
	],
	variable: '--font-sans',
});

export const fontMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jetbrains',
	weight: '400',
});
