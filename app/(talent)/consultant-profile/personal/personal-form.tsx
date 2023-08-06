'use client';

import { Grid, Typography } from '@mui/material';
import Input from '@/components/forms/input';
import CountryInput from '@/app/(talent)/professional-profile/personal/country-input';
import ProfileBottomNavigation from '@/components/profile-bottom-navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useUpdateProfile from '@/lib/hooks/use-update-profile';
import { Candidate } from '@/types';
import * as z from 'zod';

interface CandidateTitleFormProps {
	candidate: Candidate;
}

const personalSchema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	job_title: z.string(),
	location: z.string().optional(),
	portfolio_link: z.string().optional(),
	other_portfolio_link: z.string().optional(),
	linkedin: z.string().optional(),
	twitter: z.string().optional(),
});

export type CreateProfileTitleInputSchema = z.infer<typeof personalSchema>;

export default function PersonalForm({ candidate }: CandidateTitleFormProps) {
	const personal = candidate?.personal ? JSON.parse(candidate.personal) : {};

	const { handleSubmit, control } = useForm({
		mode: 'onChange',
		resolver: zodResolver(personalSchema),
		defaultValues: {
			first_name: candidate?.user?.first_name || '',
			last_name: candidate?.user?.last_name || '',
			job_title: candidate?.job_title || '',
			location: personal?.location || '',
			portfolio_link: personal?.portfolio_link || '',
			other_portfolio_link: personal?.other_portfolio_link || '',
			linkedin: personal?.linkedin || '',
			twitter: personal?.twitter || '',
		},
	});

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit = async (values: any) => {
		const customPersonal = {
			location: values.location,
			portfolio_link: values.portfolio_link,
			other_portfolio_link: values.other_portfolio_link,
			linkedin: values.linkedin,
			twitter: values.twitter,
		};
		const payload = {
			user: {
				first_name: values.first_name,
				last_name: values.last_name,
			},
			job_title: values.job_title,
			personal: JSON.stringify(customPersonal),
		};
		updateProfile(payload);
	};

	return (
		<form name='profile-title' method='post' onSubmit={handleSubmit(onSubmit)}>
			<Grid container marginTop={2} marginBottom={8}>
				<Typography
					variant='body1'
					marginBottom={2}
					color='primary'
					sx={{
						fontWeight: 600,
					}}
				>
					Basic information
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Input
							required
							name='first_name'
							control={control}
							label='First name'
							type='text'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Input
							required
							name='last_name'
							control={control}
							label='Last name'
							type='text'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Input
							required
							name='job_title'
							margin='dense'
							size='medium'
							control={control}
							label='Title'
							placeholder='Example: Customer service executive'
							type='text'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CountryInput
							name='location'
							control={control}
							label='location'
							defaultCountry={personal?.location}
						/>
					</Grid>
				</Grid>
				<Grid item xs={12} marginTop={2}>
					<Typography
						variant='body1'
						marginBottom={2}
						color='primary'
						sx={{
							fontWeight: 600,
						}}
					>
						Social links
					</Typography>
					<Input
						name='linkedin'
						margin='dense'
						size='medium'
						control={control}
						label='LinkedIn'
						placeholder='https://linkedin.com/in/username'
						type='text'
					/>
					<Input
						name='twitter'
						margin='dense'
						size='medium'
						control={control}
						label='Twitter'
						placeholder='https://twitter.com/username'
						type='text'
					/>
					<Input
						name='portfolio_link'
						margin='dense'
						size='medium'
						control={control}
						label='Portfolio link'
						placeholder='https://portfolio.com'
						type='text'
					/>
					<Input
						name='other_portfolio_link'
						margin='dense'
						size='medium'
						control={control}
						label='Other portfolio link'
						placeholder='https://other-portfolio.com'
						type='text'
					/>
				</Grid>
			</Grid>
			<ProfileBottomNavigation
				isSuccess={isSuccess}
				loading={loading}
				nextPageUrl='/professional-profile/speciality'
				nextPageTitle='Share your skills'
			/>
		</form>
	);
}
