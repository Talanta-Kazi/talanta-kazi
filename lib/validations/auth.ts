import * as z from 'zod';

export const loginAuthSchema = z.object({
	password: z.string().min(4, { message: 'Please specify your password' }),
	username: z.string().trim(),
});

export const registerAuthSchema = z
	.object({
		confirmPassword: z.string().min(1, 'Confirm Password is required'),
		email: z.string().email('Please enter a valid email address').trim(),
		firstName: z
			.string()
			.min(2, 'First name must contain at least 2 character(s)')
			.max(18),
		lastName: z
			.string()
			.min(2, 'Last name must contain at least 2 character(s)')
			.max(18),
		password: z
			.string()
			.min(8, 'The password should have at minimum length of 8'),
		userName: z
			.string()
			.min(2, 'User name must contain at least 2 character(s)')
			.max(18)
			.trim(),
		userType: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password don't match",
		path: ['confirmPassword'],
	});

export type RegisterInputSchema = z.infer<typeof registerAuthSchema>;
