'use client';

import { usePathname } from 'next/navigation';

import { Key, useState } from 'react';

import * as z from 'zod';
import SpecialitySkillsInput from '@/app/(talent)/_components/speciality-skills-input';
import ProfileBottomNavigation from '@/components/profile-bottom-navigation';
import deepParseJson from '@/lib/deep-parse-json';
import useLocalStorage from '@/lib/hooks/use-local-storage';
import useUpdateProfile from '@/lib/hooks/use-update-profile';
import { profileValidationSchema } from '@/lib/validations/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCircle } from '@mui/icons-material';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

interface CandidateSpecialityFormProps {
	defaultValues: any;
	allSpeciality: any;
}

export type CreateProfileSpecialityInputSchema = Pick<
	z.infer<typeof profileValidationSchema>,
	'speciality' | 'specialitySkills' | 'skills'
>;

const skillSchema = z.object({
	skills: z.array(
		z.object({
			speciality: z.string().nonempty(),
			specialitySkills: z.string().array().nonempty({
				message: 'Kindly add at least one skill to your speciality',
			}),
		})
	),
});

export default function SpecialityForm({
	defaultValues,
	allSpeciality,
}: CandidateSpecialityFormProps) {
	const pathname = usePathname();
	const navigationPath = pathname.split('/')[1];
	const [skills, setSkills] = useState(
		defaultValues?.skills || [
			{
				speciality: '',
				specialitySkills: [],
			},
		]
	);

	const [storedValue] = useLocalStorage('userType', undefined);

	const skillType = storedValue === 'freelancer' ? 'skilled' : 'semi-skilled';

	const speciality = allSpeciality?.filter(
		(skills: { type: string }) => skills.type === skillType
	);

	const { control, watch, reset, handleSubmit } = useForm({
		defaultValues,
		mode: 'onChange',
		resolver: zodResolver(skillSchema),
	});

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit = (data: any) => {
		updateProfile({ skills: JSON.stringify(data) });
	};

	const handleAddSpecialityAndSkillTextFields = () => {
		setSkills((prevState: any[]) => [
			...prevState,
			{
				speciality: '',
				specialitySkills: [],
			},
		]);
	};

	const handleRemoveSpecialityAndSkillTextFields = (id: number) => {
		const filteredSkills = defaultValues?.skills?.filter(
			(_: any, index: number) => index !== id
		);
		const resetSkillsValues = {
			skills: filteredSkills,
		};
		reset(resetSkillsValues);
		setSkills((prevState: any[]) =>
			prevState.filter((_: any, index: number) => index !== id)
		);
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
					{skills.map((_: any, index: Key | null | undefined | number) => (
						<Stack
							direction='row'
							alignItems='stretch'
							spacing={2}
							key={index}
							marginBottom={4}
						>
							<SpecialitySkillsInput
								id={index as number}
								control={control}
								watch={watch}
								label='Speciality'
								allSpeciality={deepParseJson(allSpeciality)}
								handleDelete={handleRemoveSpecialityAndSkillTextFields}
							/>
						</Stack>
					))}
				</Grid>

				<Grid item xs={12}>
					<Button
						startIcon={<AddCircle fontSize='large' />}
						variant='contained'
						onClick={handleAddSpecialityAndSkillTextFields}
						sx={{ color: 'unset', fontWeight: 'medium' }}
					>
						ADD SPECIALITY
					</Button>
				</Grid>
			</Grid>
			<ProfileBottomNavigation
				isSuccess={isSuccess}
				loading={loading}
				nextPageUrl={`/${navigationPath}/bio`}
				nextPageTitle='Add your bio'
			/>
		</form>
	);
}
