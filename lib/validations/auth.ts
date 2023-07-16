import * as z from 'zod';

export const authSchema = z.object({
	username: z.string().trim(),
	password: z.string().min(4, { message: 'Please specify your password' }),
});
