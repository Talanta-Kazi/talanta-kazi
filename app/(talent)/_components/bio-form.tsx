'use client';

import { usePathname } from 'next/navigation';

import * as z from 'zod';
import Input from '@/components/forms/input';
import ProfileBottomNavigation from '@/components/profile-bottom-navigation';
import useUpdateProfile from '@/lib/hooks/use-update-profile';
import { mutateStringObject } from '@/lib/utils';
import { profileValidationSchema } from '@/lib/validations/profile';
import { Candidate } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

interface CandidateBioFormProps {
	candidate: Candidate;
}

type CreateProfileBioInputSchema = Pick<
	z.infer<typeof profileValidationSchema>,
	'personal_statement' | 'videoURL'
>;

export default function BioForm({ candidate }: CandidateBioFormProps) {
	const pathname = usePathname();
	const navigationPath = pathname.split('/')[1];
	const personal = candidate?.personal ? JSON.parse(candidate.personal) : {};

	const defaultValues = {
		personal_statement: candidate?.personal_statement || '',
		videoURL: personal?.videoURL || '',
	};

	const { handleSubmit, control } = useForm<CreateProfileBioInputSchema>({
		defaultValues,
		mode: 'onChange',
		resolver: zodResolver(profileValidationSchema),
	});

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit: SubmitHandler<CreateProfileBioInputSchema> = (values) => {
		const payload = {
			personal: mutateStringObject(candidate.personal, {
				videoURL: values.videoURL as string,
			}),
			personal_statement: values.personal_statement,
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
						A short personal statement to help us know you better (500
						characters).
					</Typography>
					<Input
						autoFocus
						required
						name='personal_statement'
						margin='dense'
						size='medium'
						control={control}
						label='Personal statement'
						placeholder='I am...'
						type='text'
						multiline
						rows={7}
					/>
					<Grid item xs={12}>
						<Typography
							variant='body1'
							marginBottom={2}
							sx={{
								fontWeight: 500,
							}}
						>
							Upload a video cv link more about yourself
						</Typography>
						<Input
							name='videoURL'
							margin='dense'
							size='medium'
							control={control}
							label='Video CV URL'
							placeholder='https://yout.be'
							type='text'
						/>
					</Grid>
				</Grid>
			</Grid>
			<ProfileBottomNavigation
				isSuccess={isSuccess}
				loading={loading}
				nextPageUrl={`/${navigationPath}/education`}
				nextPageTitle='Share your skills'
			/>
		</form>
	);
}
