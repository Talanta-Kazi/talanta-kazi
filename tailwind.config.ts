import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

module.exports = {
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	corePlugins: {
		preflight: false,
	},
	darkMode: ['class'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans],
				heading: ['var(--font-heading)', ...fontFamily.sans],
				mono: ['var(--font-mono)', ...fontFamily.mono],
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;
