'use client';

import { z } from 'zod';
import { Key, useState } from 'react';
import { isBrowser } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import useUpdateProfile from '@/lib/hooks/use-update-profile';
import Typography from '@mui/material/Typography';
import { Button, Grid, Stack } from '@mui/material';
import ProfileBottomNavigation from '@/components/profile-bottom-navigation';
import { AddCircle } from '@mui/icons-material';
import EducationInput from '@/app/(talent)/professional-profile/education/education-input';
import { zodResolver } from '@hookform/resolvers/zod';

interface CandidateEducationFormProps {
	defaultValues: any;
}

const graduateEducationLevel = [
	'Diploma',
	'Bachelors degree',
	'Masters degree',
	'Doctorate Degree',
];

const semiSkilledEducationLevel = [
	'Primary Education - Partial',
	'Primary Education - Complete',
	'Secondary School - Partial',
	'Secondary School - Complete',
	'Certificate',
	'Diploma',
	'Degree',
];

const trainingType = [
	'Untrained',
	'Trained On the Job',
	'Apprenticeship',
	'Vocational Training/Certification/Licensing',
];

const educationSchema = z.object({
	education: z.array(
		z.object({
			institution: z.string().nonempty(),
			education_level: z.string().nonempty(),
			course: z.string().nonempty(),
			from_date: z.coerce.date(),
			to_date: z.coerce.date(),
			current_school: z.boolean(),
		}),
	),
});

type FormData = z.infer<typeof educationSchema>;

export default function EducationForm({
	defaultValues,
}: CandidateEducationFormProps) {
	const [education, setEducation] = useState(
		defaultValues?.education || [
			{
				institution: '',
				education_level: '',
				course: '',
				from_date: '',
				to_date: '',
				current_school: false,
			},
		],
	);

	const professionalLevel = isBrowser
		? window.localStorage.getItem('professionalLevel')
		: '';

	const educationLevel =
		professionalLevel === 'Graduate / Professional'
			? graduateEducationLevel
			: semiSkilledEducationLevel;

	const { control, handleSubmit, reset, watch } = useForm({
		mode: 'onChange',
		resolver: zodResolver(educationSchema),
		defaultValues,
	});

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit = async (data: any) => {
		updateProfile({ education: JSON.stringify(data) });
	};

	const handleAddEducationTextFields = () => {
		setEducation((prevState: any) => [
			...prevState,
			{
				institution: '',
				education_level: '',
				course: '',
				from_date: '',
				to_date: '',
				current_school: false,
			},
		]);
	};

	const handleRemoveEducationTextFields = (index: number) => {
		const filteredEducation = defaultValues?.education?.filter(
			(_: any, i: number) => i !== index,
		);
		const resetEducationValues = {
			education: filteredEducation,
		};
		reset(resetEducationValues);
		setEducation((prevState: any) => [
			...prevState.filter((_: any, i: number) => i !== index),
		]);
	};

	return (
		<form
			name='profile-education'
			method='post'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Grid container marginTop={2}>
				<Grid item xs={12}>
					<Typography
						variant='body1'
						marginBottom={2}
						sx={{
							fontWeight: 500,
						}}
					>
						The level of education you have achieved
					</Typography>
				</Grid>

				<Grid item xs={12}>
					{education.map((_: any, index: Key | null | undefined | number) => (
						<Stack
							direction='row'
							alignItems='stretch'
							spacing={2}
							key={index}
							marginBottom={4}
						>
							<EducationInput
								id={index as number}
								control={control}
								watch={watch}
								educationLevel={educationLevel}
								handleDelete={handleRemoveEducationTextFields}
							/>
						</Stack>
					))}
				</Grid>

				<Grid item xs={12}>
					<Button
						startIcon={<AddCircle fontSize='large' />}
						variant='contained'
						onClick={handleAddEducationTextFields}
						sx={{ fontWeight: 'medium', color: 'unset' }}
					>
						ADD EDUCATION LEVEL
					</Button>
				</Grid>
			</Grid>

			<ProfileBottomNavigation
				isSuccess={isSuccess}
				loading={loading}
				nextPageUrl='/create-profile/work'
				nextPageTitle='Work Experience'
			/>
		</form>
	);
}
