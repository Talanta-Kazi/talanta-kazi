import * as z from 'zod';

const educationSchema = z.array(
	z.object({
		institution: z.string(),
		education_level: z.string(),
		course: z.string(),
		from_date: z.string(),
		to_date: z.string(),
	}),
);

export const profileCreateOrPatchSchema = z.object({
	user: z.object({
		first_name: z.string(),
		last_name: z.string(),
		username: z.string().optional(),
		email: z.string().optional(),
	}),
	specialism_id: z.string(),
	experience_id: z.string(),
	job_title: z
		.string()
		.min(5, 'Please enter a valid name')
		.max(50, 'Please enter a valid name'),
	personal_statement: z.string(),
	education: z.string(),
	personal: z.string(),
	biography: z.string(),
	portfolio: z.string(),
	experience: z.string(),
	skills: z.string(),
	job_level: z.string(),
	availability_status: z.number(),
});

export const profileSchema = z.object({
	user: z.object({
		id: z.string(),
		first_name: z.string(),
		last_name: z.string(),
		username: z.string(),
		email: z.string(),
	}),
	website: z.string(),
	country: z.string(),
	location: z.string(),
	other_portfolio_link: z.string(),
	linkedin: z.string(),
	twitter: z.string(),
	speciality: z.string(),
	skills: z.string(),
	specialitySkills: z
		.string()
		.array()
		.nonempty({ message: 'Kindly add at least one skill to your speciality' }),
	personal_statement: z
		.string()
		.refine((value) => value.trim().split(/\s+/).length <= 500, {
			message: 'Personal statement should be less than 500 words',
		})
		.refine(
			(value) => {
				// regular expression to match email
				const emailRegex = new RegExp(
					/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
					'gm',
				);
				// exclude strings that contain email
				return !emailRegex.test(value);
			},
			{ message: 'Cannot contain email in text' },
		)
		.refine(
			(value) => {
				// regular expression to match phone numbers
				const phoneRegex =
					/(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
				// exclude strings that contain phone numbers
				return !phoneRegex.test(value);
			},
			{ message: 'Cannot contain phone numbers' },
		),
	videoURL: z.optional(z.string()),
	personal: z.string(),
	education: z.string(),
	institution: z.string(),
	education_level: z.string(),
	course: z.string(),
	from_date: z.string(),
	to_date: z.string(),
	current_school: z.boolean(),
	company: z.string(),
	job_title: z
		.string()
		.min(5, 'Please enter a valid name')
		.max(50, 'Please enter a valid name'),
	job_description: z.string(),
	achievements: z.string(),
	experiences_id: z.number(),
	work_experience: z.string(),
	project_title: z.string(),
	project_description: z.string(),
	portfolio_link: z.string(),
	profile_pic: z.string(),
});

export const profileValidationSchema = profileSchema.partial();

export type ProfileInputSchema = z.infer<typeof profileCreateOrPatchSchema>;
