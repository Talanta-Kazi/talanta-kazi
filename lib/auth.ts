import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { GetServerSidePropsContext } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from '@/env.mjs';
import { JWT } from 'next-auth/jwt';
import { ICandidateProfile } from '@/types';
import { isArrayEmpty } from '@/lib/utils';

interface AuthResponse {
	token: string;
	profile: ICandidateProfile;
}

const assignRole = (user) => {
	let role = 'CANDIDATE';

	if (user.is_both_employer_and_candidate) {
		role = 'BOTH';
	} else if (user.is_candidate) {
		role = 'CANDIDATE';
	} else if (user.is_employer) {
		role = 'EMPLOYER';
	}

	return role;
};

// Helper to obtain a new access_token from a refresh token.
const refreshAccessToken = async (token: JWT) => {
	try {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Authorization', `Bearer ${token.refresh}`);

		const res = await fetch(`${env.API_URL}/auth}`, {
			method: 'POST',
			headers: headers,
		});

		const user = await res.json();
		if (!res.ok) {
			throw new Error();
		}

		//If no error and we have user data, return it
		if (res.ok && user) {
			return user;
		}
	} catch (error) {
		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
};

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
		maxAge: 3 * 60 * 60,
	},
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'email',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const headers = new Headers();
				headers.append('Content-Type', 'application/json');
				headers.append('Accept', 'application/json');

				const payload = {
					username: credentials?.username,
					password: credentials?.password,
				};

				const res = await fetch(`${env.API_URL}/login/`, {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: headers,
				});

				const user = await res.json();

				// If no error and we have user data, return it
				if (res.status === 200 && user) {
					return user;
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
		/**
		 * ...add more providers here
		 *
		 * Most other providers require a bit more work than the Discord provider.
		 * For example, the GitHub provider requires you to add the
		 * `refresh_token_expires_in` field to the Account model. Refer to the
		 * NextAuth.js docs for the provider you want to use. Example:
		 * @see https://next-auth.js.org/providers/github
		 **/
	],
	pages: {
		signIn: '/login',
		error: '/login',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				// @ts-expect-error
				token.id = user.profile.id || '';
				// @ts-expect-error
				token.username = user.profile.user.username || '';
				// @ts-expect-error
				token.picture = user.profile.user.profilePic || '';
				// @ts-expect-error
				token.role = assignRole(user.profile.user);
				// @ts-expect-error
				token.newUser = isArrayEmpty(user.profile.job_title);
				token.token = user.token;
				token.refresh = user.refresh;
				token.token_expiry = user.token_expiry;
				token.refresh_expiry = user.refresh_expiry;
			}

			let currentDate = new Date();

			currentDate.setDate(currentDate.getDate() + 20);

			const expiryDate = token?.token_expiry! * 1000;

			if (Date.now() + 20 < expiryDate) {
				// not yet expired
				return token;
			}

			return refreshAccessToken(token);
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id as string;
				session.user.name = token.name as string;
				session.user.email = token.email as string;
				session.user.image = token.picture as string;
				session.user.role = token.role;
			}

			return session;
		},
	},
	debug: env.NODE_ENV === 'development',
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext['req'];
	res: GetServerSidePropsContext['res'];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
