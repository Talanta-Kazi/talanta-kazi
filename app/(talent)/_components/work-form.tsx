'use client';

import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';

import WorkExperienceInput from '@/app/(talent)/_components/work-experience-input';
import Input from '@/components/forms/input';
import ProfileBottomNavigation from '@/components/profile-bottom-navigation';
import useUpdateProfile from '@/lib/hooks/use-update-profile';
import { fancyId, isBrowser, stringifyMap } from '@/lib/utils';
import { profileValidationSchema } from '@/lib/validations/profile';
import { Candidate } from '@/types';
import { Add, AddCircle } from '@mui/icons-material';
import { Button, Fab, Grid, MenuItem, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface CandidateEducationFormProps {
	candidate: Candidate;
}

const graduateWorkLevel = [
	'Intern/Fellow',
	'Entry Level',
	'Junior Manager',
	'Experienced Professional',
	'Mid-Level Manager',
	'Specialist/Highly Skilled Professional',
	'General/Senior Manager',
	'Directors or Executive',
];

const semiSkilledJobLevel = [
	'Entry Level',
	'Experienced',
	'Master Tradesman/Woman',
	'Supervisor/Lead Technician',
];

type CreateProfileWorkExperienceInputSchema = z.infer<
	typeof profileValidationSchema
>;

export default function WorkForm({ candidate }: CandidateEducationFormProps) {
	const pathname = usePathname();
	const navigationPath = pathname.split('/')[1];
	const [workComponent, setWorkComponent] = useState<
		Array<Record<string, any>>
	>([{ id: 0, workExperience: '' }]);
	const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs(''));
	const [toDate, setToDate] = useState<Dayjs | null>(dayjs(''));
	const [isCurrentWork, setIsCurrentWork] = useState(false);
	const [workExperienceSelected, setWorkExperienceSelected] = useState(
		new Map<string, string[]>()
	);

	const professionalWorkLevel = isBrowser
		? window.localStorage.getItem('professionalLevel')
		: '';

	const workLevel =
		professionalWorkLevel === 'Graduate / Professional'
			? graduateWorkLevel
			: semiSkilledJobLevel;

	const defaultValues = {
		work_experience: candidate?.experience || '',
	};

	const { control, watch, handleSubmit } =
		useForm<CreateProfileWorkExperienceInputSchema>({
			mode: 'onChange',
		});

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			setWorkExperienceSelected(
				// @ts-expect-error
				(prevMap) => new Map(prevMap.set(name, value[name]))
			);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit = (values: { work_experience: string }) => {
		const experience = [];

		if (workComponent.length === 1 && workExperienceSelected.has('company')) {
			experience.push(JSON.parse(stringifyMap(workExperienceSelected)));
		}

		workComponent.map((item) => {
			if (item.workExperience !== '') {
				experience.push(JSON.parse(item.workExperience));
			}
		});

		updateProfile({
			experience: JSON.stringify(experience),
			// @ts-expect-error
			experiences_id: workLevel.findIndex(
				(work) => work === values.work_experience
			),
		});
	};

	const handleCurrentWorkSelect = () =>
		setIsCurrentWork((prevState) => !prevState);

	const handleAddWorkExperienceTextFields = () => {
		setWorkComponent((prevState) =>
			prevState.concat({
				id: prevState[0].id++ as number,
				workExperience: stringifyMap(workExperienceSelected),
			})
		);
	};

	const handleRemoveWorkExperienceTextFields = (id: number) => {
		setWorkComponent((prevState) => prevState.filter((item) => item.id !== id));
	};

	return (
		// @ts-expect-error
		<form name='profile-work' method='post' onSubmit={handleSubmit(onSubmit)}>
			<Grid container marginTop={0} spacing={0}>
				<Grid item xs={12} spacing={0}>
					<Typography
						variant='body1'
						marginBottom={2}
						sx={{
							fontWeight: 500,
						}}
					>
						How do you range your job experience?
					</Typography>

					<Grid item xs={11}>
						<Input
							select
							autoFocus={false}
							margin='dense'
							name='work_experience'
							placeholder='Experience level'
							size='medium'
							control={control}
							label='Experience level'
							type='text'
						>
							{workLevel.map((item: string) => (
								<MenuItem key={fancyId()} value={item}>
									{item}
								</MenuItem>
							))}
						</Input>
					</Grid>

					<Typography
						variant='body1'
						marginY={2}
						sx={{
							fontWeight: 500,
						}}
					>
						Add professional work experiences
					</Typography>

					{workComponent
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
								<WorkExperienceInput
									id={item.id}
									control={control}
									handleDelete={handleRemoveWorkExperienceTextFields}
									fromDate={fromDate}
									setFromDate={setFromDate}
									setToDate={setToDate}
									toDate={toDate}
									handleCurrentSchoolSelect={handleCurrentWorkSelect}
									isCurrentWork={isCurrentWork}
								/>
							</Stack>
						))}

					<Grid item xs={12}>
						<Button
							startIcon={<AddCircle fontSize='large' />}
							variant='contained'
							onClick={handleAddWorkExperienceTextFields}
							sx={{
								color: 'unset',
								display: { md: 'flex', xs: 'none' },
								fontWeight: 'medium',
							}}
						>
							ADD WORK EXPERIENCE
						</Button>
					</Grid>
				</Grid>
			</Grid>
			<Fab
				variant='extended'
				color='primary'
				aria-label='add'
				onClick={handleAddWorkExperienceTextFields}
				sx={{
					bottom: 72,
					display: { md: 'none', xs: 'flex' },
					fontWeight: 'medium',
					position: 'fixed',
					right: 30,
				}}
			>
				<Add sx={{ mr: 0.5 }} />
				WORK
			</Fab>
			<ProfileBottomNavigation
				isSuccess={isSuccess}
				loading={loading}
				nextPageUrl='/profile'
				nextPageTitle='Finish'
				// nextPageUrl={`/${navigationPath}/portfolio`}
				// nextPageTitle='Portfolio'
			/>
		</form>
	);
}
