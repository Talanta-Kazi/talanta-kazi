import { z } from 'zod';
import { getSession } from '@/lib/auth';
import { env } from '@/env.mjs';
import { profileCreateOrPatchSchema } from '@/lib/validations/profile';

const routeContextSchema = z.object({
	params: z.object({
		profileId: z.string(),
	}),
});

export async function PUT(
	req: Request,
	context: z.infer<typeof routeContextSchema>,
) {
	const session = await getSession();

	if (!session) {
		return new Response('Unauthorized', { status: 403 });
	}

	try {
		const { params } = routeContextSchema.parse(context);

		const json = await req.json();
		const body = profileCreateOrPatchSchema.partial().parse(json);

		const bodyPayload = {
			user: session?.user?.id,
			job_level: 'Experienced Professional',
			county: 'Nairobi',
			availability_status: 0,
			specialism_id: '[5]',
			experiences_id: 1,
			education_levels_id: 0,
			...body,
		};

		const profile = await fetch(
			`${env.API_URL}/candidate/profile/update/${params.profileId}`,
			{
				method: 'PUT',
				body: JSON.stringify(bodyPayload),
				headers: {
					Authorization: `Token ${session?.user?.token}`,
					'Content-Type': 'application/json',
				},
			},
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
			status: 200,
			headers: {
				'content-type': 'application/json',
			},
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 });
		}

		return new Response(null, { status: 500 });
	}
}
