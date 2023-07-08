import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const fontSans = localFont({
	src: [
		{
			path: '../assets/fonts/CircularStd-Book.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../assets/fonts/CircularStd-Book.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../assets/fonts/CircularStd-Book.woff2',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../assets/fonts/CircularStd-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-sans',
	display: 'swap',
});

export const fontMono = JetBrains_Mono({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-jetbrains',
});
