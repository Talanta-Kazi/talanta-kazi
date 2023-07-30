'use client';

import { Candidate } from '@/types';
import { profileValidationSchema } from '@/lib/validations/profile';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { isBrowser, stringifyMap } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import useUpdateProfile from '@/lib/hooks/useUpdateProfile';
import Typography from '@mui/material/Typography';
import { Button, Grid, Stack } from '@mui/material';
import ProfileBottomNavigation from '@/components/profile-bottom-navigation';
import { AddCircle } from '@mui/icons-material';
import EducationInput from '@/app/(candidate)/create-profile/education/education-input';

interface CandidateEducationFormProps {
	candidate: Candidate;
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

type CreateProfileEducationInputSchema = z.infer<
	typeof profileValidationSchema
>;

export default function EducationForm({
	candidate,
}: CandidateEducationFormProps) {
	const [educationComponent, setEducationComponent] = useState<
		Array<Record<string, any>>
	>([{ id: 0, educationLevel: '' }]);
	const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs(''));
	const [toDate, setToDate] = useState<Dayjs | null>(dayjs(''));
	const [isCurrentSchool, setIsCurrentSchool] = useState(false);
	const [educationLevelSelected, setEducationLevelSelected] = useState(
		new Map<string, string[]>(),
	);

	const handleCurrentSchoolSelect = () =>
		setIsCurrentSchool((prevState) => !prevState);

	const professionalLevel = isBrowser
		? window.localStorage.getItem('professionalLevel')
		: '';

	const educationLevel =
		professionalLevel === 'Graduate / Professional'
			? graduateEducationLevel
			: semiSkilledEducationLevel;

	const { control, handleSubmit, watch } =
		useForm<CreateProfileEducationInputSchema>({
			mode: 'onChange',
		});

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			setEducationLevelSelected(
				// @ts-expect-error
				(prevMap) => new Map(prevMap.set(name, value[name])),
			);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit = () => {
		const education = [];

		if (
			educationComponent.length === 1 &&
			educationLevelSelected.has('institution')
		) {
			education.push(JSON.parse(stringifyMap(educationLevelSelected)));
		}

		educationComponent.forEach((item) => {
			if (item.educationLevel !== '') {
				education.push(JSON.parse(item.educationLevel));
			}
		});

		updateProfile({ education: JSON.stringify(education) });
	};

	const handleAddEducationTextFields = () => {
		setEducationComponent((prevState) =>
			prevState.concat({
				id: prevState[0].id++,
				educationLevel: stringifyMap(educationLevelSelected),
			}),
		);
	};

	const handleRemoveEducationTextFields = (id: number) => {
		setEducationComponent((prevState) =>
			prevState.filter((item) => item.id !== id),
		);
	};

	return (
		<form
			name='profile-education'
			method='post'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Grid container spacing={4} marginTop={2}>
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
					{educationComponent
						.slice()
						.sort((a, b) => a.id - b.id)
						.map((item) => (
							<Stack
								direction='row'
								alignItems='stretch'
								spacing={2}
								key={item.id}
								marginBottom={4}
							>
								<EducationInput
									id={item.id}
									control={control}
									educationLevel={educationLevel}
									handleDelete={handleRemoveEducationTextFields}
									fromDate={fromDate}
									setFromDate={setFromDate}
									setToDate={setToDate}
									toDate={toDate}
									handleCurrentSchoolSelect={handleCurrentSchoolSelect}
									isCurrentSchool={isCurrentSchool}
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
