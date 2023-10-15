import * as z from 'zod';

const educationSchema = z.array(
	z.object({
		course: z.string(),
		education_level: z.string(),
		from_date: z.string(),
		institution: z.string(),
		to_date: z.string(),
	})
);

export const profileCreateOrPatchSchema = z.object({
	biography: z.string(),
	education: z.string(),
	experience: z.string(),
	experience_id: z.string(),
	job_level: z.string(),
	availability_status: z.number(),
	job_title: z
		.string()
		.min(5, 'Please enter a valid name')
		.max(50, 'Please enter a valid name'),
	personal: z.string(),
	specialism_id: z.string(),
	personal_statement: z.string(),
	user: z.object({
		first_name: z.string(),
		last_name: z.string(),
		username: z.string().optional(),
		email: z.string().optional(),
	}),
	portfolio: z.string(),
	profile_pic: z.string(),
	skills: z.string(),
});

export const profileSchema = z.object({
	country: z.string(),
	linkedin: z.string(),
	location: z.string(),
	other_portfolio_link: z.string(),
	personal: z.string(),
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
					'gm'
				);
				// exclude strings that contain email
				return !emailRegex.test(value);
			},
			{ message: 'Cannot contain email in text' }
		)
		.refine(
			(value) => {
				// regular expression to match phone numbers
				const phoneRegex =
					/(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
				// exclude strings that contain phone numbers
				return !phoneRegex.test(value);
			},
			{ message: 'Cannot contain phone numbers' }
		),
	education: z.string(),
	skills: z.string(),
	education_level: z.string(),
	user: z.object({
		first_name: z.string(),
		id: z.string(),
		last_name: z.string(),
		email: z.string(),
		username: z.string(),
	}),
	course: z.string(),
	website: z.string(),
	current_school: z.boolean(),
	company: z.string(),
	speciality: z.string(),
	from_date: z.string(),
	twitter: z.string(),
	achievements: z.string(),
	experiences_id: z.number(),
	specialitySkills: z
		.string()
		.array()
		.nonempty({ message: 'Kindly add at least one skill to your speciality' }),
	institution: z.string(),
	videoURL: z.optional(z.string()),
	job_description: z.string(),
	job_title: z
		.string()
		.min(5, 'Please enter a valid name')
		.max(50, 'Please enter a valid name'),
	portfolio_link: z.string(),
	profile_pic: z.string(),
	project_description: z.string(),
	project_title: z.string(),
	to_date: z.string(),
	work_experience: z.string(),
});

export const profileValidationSchema = profileSchema.partial();

export type ProfileInputSchema = z.infer<typeof profileCreateOrPatchSchema>;
