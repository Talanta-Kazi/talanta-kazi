import { NextRequest } from 'next/server';

import * as z from 'zod';
import { env } from '@/env.mjs';
import { registerAuthSchema } from '@/lib/validations/auth';

export async function POST(req: NextRequest) {
	try {
		const reqJson = await req.json();
		const validatedJson = registerAuthSchema.parse(reqJson);

		const {
			firstName,
			lastName,
			userName,
			password,
			confirmPassword,
			email,
			userType,
		} = validatedJson;

		const body = {
			availability_status: '0',
			education_levels_id: '5',
			experiences_id: '1',
			is_both_employer_and_candidate: userType === 'Both Candidate & Employer',
			is_candidate: userType === 'candidate',
			is_employer: userType === 'employer',
			user: {
				email,
				first_name: firstName,
				last_name: lastName,
				password,
				password2: confirmPassword,
				username: userName,
			},
			// profile_pic:
			// 	"https://res.cloudinary.com/mashafrancis/image/upload/v1670917120/musings/illustrations/avatar.svg",
		};

		const registerResponse = await fetch(`${env.API_URL}/users/register/`, {
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});

		const data = await registerResponse.json();

		return new Response(JSON.stringify(data ?? null), {
			headers: {
				'content-type': 'application/json',
			},
			status: 200,
		});
	} catch (error: any) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 });
		}

		return new Response(null, { status: 500 });
	}
}
