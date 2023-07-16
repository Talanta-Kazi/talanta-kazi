import * as z from 'zod';

export const loginAuthSchema = z.object({
	username: z.string().trim(),
	password: z.string().min(4, { message: 'Please specify your password' }),
});

export const registerAuthSchema = z
	.object({
		userType: z.string(),
		firstName: z
			.string()
			.min(2, 'First name must contain at least 2 character(s)')
			.max(18),
		lastName: z
			.string()
			.min(2, 'Last name must contain at least 2 character(s)')
			.max(18),
		userName: z
			.string()
			.min(2, 'User name must contain at least 2 character(s)')
			.max(18)
			.trim(),
		email: z.string().email('Please enter a valid email address').trim(),
		password: z
			.string()
			.min(8, 'The password should have at minimum length of 8'),
		confirmPassword: z.string().min(1, 'Confirm Password is required'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: "Password don't match",
	});

export type RegisterInputSchema = z.infer<typeof registerAuthSchema>;
