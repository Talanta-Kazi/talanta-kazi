import { DefaultSession, DefaultUser, Session, User } from 'next-auth';
import { DefaultJWT, JWT } from 'next-auth/jwt';

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
	interface User {
		user: {
			id?: string | number;
			username: string;
			role: string;
		};
		token: string;
		refresh: string;
		token_expiry?: number;
		refresh_expiry?: number;
		error?: string;
	}

	interface Session {
		user: {
			username: string | null;
			id: string | null;
			token: string | null;
			image: string | null;
			role: string;
			newUser: boolean;
		} & DefaultSession['user'];
		token?: string;
		refresh?: string;
		token_expiry?: number;
		refresh_expiry?: number;
		error?: string;
	}
}

/** Example on how to extend the built-in types for JWT */
declare module 'next-auth/jwt' {
	interface JWT {
		id?: string | number;
		username: string;
		role: string;
		token: string;
		refresh: string;
		token_expiry?: number;
		refresh_expiry?: number;
		error?: string;
	}
}
