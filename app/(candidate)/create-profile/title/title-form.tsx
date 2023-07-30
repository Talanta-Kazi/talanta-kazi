'use client';

import { Grid, Typography } from '@mui/material';
import Input from '@/components/forms/input';
import CountryInput from '@/app/(candidate)/create-profile/title/country-input';
import ProfileBottomNavigation from '@/components/profile-bottom-navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileValidationSchema } from '@/lib/validations/profile';
import useUpdateProfile from '@/lib/hooks/useUpdateProfile';
import { CreateProfileTitleInputSchema } from '@/app/(candidate)/create-profile/title/page';
import { Candidate } from '@/types';

interface CandidateTitleFormProps {
	candidate: Candidate;
}

export default function TitleForm({ candidate }: CandidateTitleFormProps) {
	const personal = candidate?.personal ? JSON.parse(candidate.personal) : {};

	const defaultValues = {
		job_title: candidate?.job_title || '',
		country: personal?.country || '',
		website: personal?.website || '',
	};

	const { handleSubmit, control } = useForm<CreateProfileTitleInputSchema>({
		mode: 'onChange',
		resolver: zodResolver(profileValidationSchema),
		defaultValues,
	});

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit: SubmitHandler<CreateProfileTitleInputSchema> = (values) => {
		const customPersonal = {
			country: values.country,
			website: values.website,
		};
		const payload = {
			job_title: values.job_title,
			personal: JSON.stringify(customPersonal),
		};
		updateProfile(payload);
	};

	return (
		<form name='profile-title' method='post' onSubmit={handleSubmit(onSubmit)}>
			<Grid container marginTop={2}>
				<Grid item xs={12}>
					<Typography
						variant='body1'
						marginBottom={2}
						sx={{
							fontWeight: 500,
						}}
					>
						Stand out by describing yourself and personal details.
					</Typography>
					<Input
						autoFocus
						required
						name='job_title'
						margin='dense'
						size='medium'
						control={control}
						label='Title'
						placeholder='Example: Customer service executive'
						type='text'
					/>
					<Input
						name='website'
						margin='dense'
						size='medium'
						control={control}
						label='Website'
						placeholder='Example: https://my-website.com'
						type='text'
					/>
					<CountryInput
						name='country'
						control={control}
						label='country'
						defaultCountry={personal?.country}
					/>
				</Grid>
			</Grid>
			<ProfileBottomNavigation
				isSuccess={isSuccess}
				loading={loading}
				nextPageUrl='/create-profile/speciality'
				nextPageTitle='Share your skills'
			/>
		</form>
	);
}
