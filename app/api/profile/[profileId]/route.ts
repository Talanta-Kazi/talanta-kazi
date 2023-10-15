import { env } from '@/env.mjs';
import { getSession } from '@/lib/auth';
import { profileCreateOrPatchSchema } from '@/lib/validations/profile';
import { z } from 'zod';

const routeContextSchema = z.object({
	params: z.object({
		profileId: z.string(),
	}),
});

export async function PUT(
	req: Request,
	context: z.infer<typeof routeContextSchema>
) {
	const session = await getSession();

	if (!session) {
		return new Response('Unauthorized', { status: 403 });
	}

	try {
		const { params } = routeContextSchema.parse(context);

		const json = await req.json();
		const body = profileCreateOrPatchSchema.partial().parse(json);

		console.log('Class: PUT, Function: PUT, Line 28 body():', body);

		const bodyPayload = {
			availability_status: 0,
			county: 'Nairobi',
			education_levels_id: 0,
			experiences_id: 1,
			job_level: 'Experienced Professional',
			profile_pic: body.profile_pic,
			specialism_id: '[5]',
			user: session?.user?.id,
			...body,
		};

		const profile = await fetch(
			`${env.API_URL}/candidate/profile/update/${params.profileId}`,
			{
				body: JSON.stringify(bodyPayload),
				headers: {
					Authorization: `Token ${session?.user?.token}`,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}
		);

		const data = await profile.json();

		if (data.hasOwnProperty('non_field_errors')) {
			return new Response(JSON.stringify(data.non_field_errors[0]), {
				status: 400,
			});
		}

		if (data.error) {
			return new Response(JSON.stringify(data.error), { status: 400 });
		}

		if (data.errors) {
			return new Response(JSON.stringify(data.errors), { status: 400 });
		}

		return new Response(JSON.stringify(data ?? null), {
			headers: {
				'content-type': 'application/json',
			},
			status: 200,
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 });
		}

		return new Response(null, { status: 500 });
	}
}
