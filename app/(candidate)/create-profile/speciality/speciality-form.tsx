'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import ProfileBottomNavigation from '@/components/profile-bottom-navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileValidationSchema } from '@/lib/validations/profile';
import useUpdateProfile from '@/lib/hooks/use-update-profile';
import { Candidate } from '@/types';
import { useEffect, useMemo, useState } from 'react';
import { AddCircle } from '@mui/icons-material';
import { isBrowser, objectToMap, stringifyMap } from '@/lib/utils';
import * as z from 'zod';
import SpecialitySkillsInput from '@/app/(candidate)/create-profile/speciality/speciality-skills-input';

interface CandidateSpecialityFormProps {
	candidate: Candidate;
	allSpeciality: any;
}

export type CreateProfileSpecialityInputSchema = Pick<
	z.infer<typeof profileValidationSchema>,
	'speciality' | 'specialitySkills' | 'skills'
>;

export default function SpecialityForm({
	candidate,
	allSpeciality,
}: CandidateSpecialityFormProps) {
	const defaultSkills = JSON.parse(
		candidate?.skills ? candidate.skills : '{"":[""]}',
	);
	const defaultSpecialism = Object.keys(defaultSkills);

	const defaultSpecialismsObject = defaultSpecialism?.reduce(
		(acc, specialism, index) => {
			// @ts-expect-error
			acc[index] = {
				id: index,
				specialism,
			};
			return acc;
		},
		{},
	);

	let allSpecialtiesData: never[] = [];
	const professionalLevel = isBrowser
		? window.localStorage.getItem('professionalLevel')
		: '';
	const skillType =
		professionalLevel === 'Skilled / Semi-skilled Workers'
			? 'semi-skilled'
			: 'skilled';

	const [speciality, setSpeciality] = useState(
		allSpeciality.filter(
			(skills: { type: string }) => skills.type === skillType,
		),
	);
	const [specialitiesSelected, setSelectedSpecialities] = useState(
		objectToMap(defaultSkills) || new Map<string, string[]>(),
	);

	const [specialityAndSkillsComp, setSpecialityAndSkillsComp] = useState<
		Array<Record<string, number | string>>
	>(Object.values(defaultSpecialismsObject));

	console.log(
		'Class: default, Function: SpecialityForm, Line 77 specialityAndSkillsComp():',
		specialityAndSkillsComp,
	);

	const [removedSpeciality, setRemovedSpeciality] = useState<
		Set<Record<string, string>>
	>(new Set());

	const { control, watch, handleSubmit } =
		useForm<CreateProfileSpecialityInputSchema>({
			mode: 'onChange',
			resolver: zodResolver(profileValidationSchema),
			defaultValues: {
				skills: candidate?.skills,
			},
		});

	const specialism = watch('speciality');
	const skills = watch('specialitySkills');

	const allSpecialties = useMemo(
		() =>
			speciality
				?.filter(
					(item: { specialty: string | undefined }) =>
						item.specialty === specialism,
				)[0]
				?.specific_specialty.trim(),
		[speciality, specialism],
	);

	if (typeof allSpecialties !== 'undefined') {
		allSpecialtiesData = JSON.parse(allSpecialties);
	}

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit = () => {
		const skills = stringifyMap(specialitiesSelected);
		updateProfile({ skills });
	};

	useEffect(() => {
		setSelectedSpecialities(
			// @ts-expect-error
			(prevMap) => new Map(prevMap.set(specialism, skills)),
		);
	}, [skills, specialism]);

	const handleAddSpecialityAndSkillsTextFields = () => {
		setSpecialityAndSkillsComp((prevState) =>
			// @ts-expect-error
			prevState.concat({
				id: (prevState[0].id as number)++,
				specialism: specialism,
			}),
		);
		setSpeciality((prevState: any[]) => {
			const removedValue = prevState.find(
				(item) => item.specialty === specialism,
			);
			setRemovedSpeciality((prevSet) => new Set([...prevSet, removedValue]));
			return prevState.filter(
				(item: { specialty: string | undefined }) =>
					item.specialty !== specialism,
			);
		});
	};

	const handleRemoveSpecialityAndSkillsTextFields = (id: number) => {
		setSpecialityAndSkillsComp((prevState) =>
			prevState.filter((item) => item.id !== id),
		);

		const specialityToBeAddedBack: string = specialityAndSkillsComp.filter(
			(item) => item.id === id,
		)[0].specialism as string;

		let tempSpecialityValue: Record<string, string>;
		removedSpeciality.forEach((item) => {
			if (item.specialty === specialityToBeAddedBack) {
				tempSpecialityValue = item;
			}
		});

		setSpeciality((prevState: any) => [...prevState, tempSpecialityValue]);

		const newSpecialitiesSelected = new Map(specialitiesSelected);
		newSpecialitiesSelected.delete(specialityToBeAddedBack);
		setSelectedSpecialities(newSpecialitiesSelected);
	};

	return (
		<form
			name='profile-speciality'
			method='post'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Grid container marginTop={0}>
				<Grid item xs={12}>
					<Typography
						variant='body1'
						marginBottom={0}
						sx={{
							fontWeight: 500,
						}}
					>
						Your skills show clients what you can offer and help us choose which
						jobs to recommend to you. Add or remove the ones we&lsquo;ve
						suggested, or scroll from our list below. It&lsquo;s up to you.
					</Typography>
				</Grid>

				<Grid item xs={12}>
					{specialityAndSkillsComp
						.slice()
						.sort((a, b) => +a.id - +b.id)
						.map((item) => (
							<Stack
								direction='row'
								alignItems='stretch'
								spacing={2}
								key={item.id}
								marginBottom={4}
							>
								<SpecialitySkillsInput
									id={item.id as number}
									control={control}
									label='Speciality'
									allSpeciality={speciality}
									allSpecialtiesData={allSpecialtiesData}
									specialism={specialism}
									handleDelete={handleRemoveSpecialityAndSkillsTextFields}
								/>
							</Stack>
						))}
				</Grid>

				<Grid item xs={12}>
					<Button
						startIcon={<AddCircle fontSize='large' />}
						variant='contained'
						onClick={handleAddSpecialityAndSkillsTextFields}
						sx={{ fontWeight: 'medium', color: 'unset' }}
					>
						ADD SPECIALITY
					</Button>
				</Grid>
			</Grid>
			<ProfileBottomNavigation
				isSuccess={isSuccess}
				loading={loading}
				nextPageUrl='/create-profile/bio'
				nextPageTitle='Add your bio'
			/>
		</form>
	);
}
