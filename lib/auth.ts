import { env } from '@/env.mjs';
import { isArrayEmpty } from '@/lib/utils';
import { CandidateProfile } from '@/types';
import { type NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

interface AuthResponse {
	token: string;
	profile: CandidateProfile;
}

const assignRole = (user: any) => {
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

		const res = await fetch(`${env.API_URL}/users/api-user-login/}`, {
			headers: headers,
			method: 'POST',
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
	callbacks: {
		async jwt({ token, user, account }) {
			if (account && user) {
				return {
					...token,
					accessToken: user.token,
					// @ts-expect-error
					id: user.profile.id || '',

					// @ts-expect-error
					newUser: isArrayEmpty(user.profile.job_title),

					// @ts-expect-error
					picture: user.profile.user.profilePic || '',

					// @ts-expect-error
					role: assignRole(user.profile.user),

					// @ts-expect-error
					username: user.profile.user.username || '',
				};
			}

			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.id || '',
					image: token.picture,
					newUser: token.newUser,
					role: token.role,
					token: token.accessToken || '',
					username: token.username || '',
				},
			};
		},
	},
	debug: process.env.NODE_ENV === 'development',
	pages: {
		error: '/login',
		newUser: '/create-profile/title',
		signIn: '/login', // If set, new users will be directed here on first sign in
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials, req) {
				const headers = new Headers();
				headers.append('Content-Type', 'application/json');
				headers.append('Accept', 'application/json');

				const payload = {
					password: credentials?.password,
					username: credentials?.username,
				};

				const res = await fetch(`${env.API_URL}/users/api-user-login/`, {
					body: JSON.stringify(credentials),
					headers: headers,
					method: 'POST',
				});

				const user = await res.json();

				// If no error and we have user data, return it
				if (res.status === 200 && user) {
					return user;
				}
				// Return null if user data could not be retrieved
				return null;
			},
			credentials: {
				password: { label: 'Password', type: 'password' },
				username: { label: 'Username', type: 'text' },
			},
			id: 'credentials',
			name: 'email',
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
	session: {
		maxAge: 3 * 60 * 60,
		strategy: 'jwt',
	},
};

export function getSession() {
	return getServerSession(authOptions) as Promise<{
		user: {
			id: string;
			token: string;
			username: string;
			email: string;
			image: string;
		};
	} | null>;
}
