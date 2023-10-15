'use client';

import { usePathname } from 'next/navigation';

import { Key, useState } from 'react';

import EducationInput from '@/app/(talent)/_components/education-input';
import ProfileBottomNavigation from '@/components/profile-bottom-navigation';
import useUpdateProfile from '@/lib/hooks/use-update-profile';
import { isBrowser } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCircle } from '@mui/icons-material';
import { Button, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
			course: z.string().nonempty(),
			current_school: z.boolean(),
			education_level: z.string().nonempty(),
			from_date: z.coerce.date(),
			institution: z.string().nonempty(),
			to_date: z.coerce.date(),
		})
	),
});

type FormData = z.infer<typeof educationSchema>;

export default function EducationForm({
	defaultValues,
}: CandidateEducationFormProps) {
	const pathname = usePathname();
	const navigationPath = pathname.split('/')[1];
	const [education, setEducation] = useState(
		defaultValues?.education || [
			{
				course: '',
				current_school: false,
				education_level: '',
				from_date: '',
				institution: '',
				to_date: '',
			},
		]
	);

	const professionalLevel = isBrowser
		? window.localStorage.getItem('professionalLevel')
		: '';

	const educationLevel =
		professionalLevel === 'Graduate / Professional'
			? graduateEducationLevel
			: semiSkilledEducationLevel;

	const { control, handleSubmit, reset, watch } = useForm({
		defaultValues,
		mode: 'onChange',
		resolver: zodResolver(educationSchema),
	});

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit = async (data: any) => {
		const payload = { education: JSON.stringify(data) };
		updateProfile(payload);
	};

	const handleAddEducationTextFields = () => {
		setEducation((prevState: any) => [
			...prevState,
			{
				course: '',
				current_school: false,
				education_level: '',
				from_date: '',
				institution: '',
				to_date: '',
			},
		]);
	};

	const handleRemoveEducationTextFields = (index: number) => {
		const filteredEducation = defaultValues?.education?.filter(
			(_: any, i: number) => i !== index
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
						sx={{ color: 'unset', fontWeight: 'medium' }}
					>
						ADD EDUCATION LEVEL
					</Button>
				</Grid>
			</Grid>

			<ProfileBottomNavigation
				isSuccess={isSuccess}
				loading={loading}
				nextPageUrl={`/${navigationPath}/work`}
				nextPageTitle='Work Experience'
			/>
		</form>
	);
}
