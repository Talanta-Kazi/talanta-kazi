import { NextRequest } from 'next/server';
import { registerAuthSchema } from '@/lib/validations/auth';
import * as z from 'zod';
import { env } from '@/env.mjs';

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
			user: {
				email,
				password,
				password2: confirmPassword,
				first_name: firstName,
				last_name: lastName,
				username: userName,
			},
			availability_status: '0',
			is_employer: userType === 'employer',
			is_candidate: userType === 'candidate',
			is_both_employer_and_candidate: userType === 'Both Candidate & Employer',
			experiences_id: '1',
			education_levels_id: '5',
			// profile_pic:
			// 	"https://res.cloudinary.com/mashafrancis/image/upload/v1670917120/musings/illustrations/avatar.svg",
		};

		const registerResponse = await fetch(`${env.API_URL}/users/register/`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await registerResponse.json();

		return new Response(JSON.stringify(data ?? null), {
			status: 200,
			headers: {
				'content-type': 'application/json',
			},
		});
	} catch (error: any) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 });
		}

		return new Response(null, { status: 500 });
	}
}
