// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import { env } from './env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	swcMinify: true,
	reactStrictMode: true,
	images: {
		domains: [
			'firebasestorage.googleapis.com',
			'res.cloudinary.com',
			'localhost',
		],
		remotePatterns: [
			{ hostname: 'source.unsplash.com' },
			{ hostname: 'lh3.googleusercontent.com' },
			{ hostname: 'res.cloudinary.com' },
		],
	},
	rewrites: async () => [
		{
			source: '/api/heimdall',
			destination: env.NEXT_PUBLIC_HEIMDALL_API,
		},
	],
	eslint: {
		ignoreDuringBuilds: true,
	},
	poweredByHeader: false,
	modularizeImports: {
		'@mui/icons-material': {
			transform: '@mui/icons-material/{{member}}',
		},
	},
};

export default nextConfig;
