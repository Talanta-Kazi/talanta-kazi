'use client';

import { useEffect, useState } from 'react';

import PortfolioInput from '@/app/(talent)/professional-profile/portfolio/portfolio-input';
import ProfileBottomNavigation from '@/components/profile-bottom-navigation';
import useUpdateProfile from '@/lib/hooks/use-update-profile';
import { stringifyMap } from '@/lib/utils';
import { profileValidationSchema } from '@/lib/validations/profile';
import { Candidate } from '@/types';
import { AddCircle } from '@mui/icons-material';
import { Button, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface CandidatePortfolioFormProps {
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

type CreateProfilePortfolioInputSchema = z.infer<
	typeof profileValidationSchema
>;

export default function PortfolioForm({
	candidate,
}: CandidatePortfolioFormProps) {
	const [imageUrls, setImageUrls] = useState<string>('');
	const [videoUrls, setVideoUrls] = useState<string>('');
	const [documentUrls, setDocumentUrls] = useState<string>('');
	const [portfolioComponent, setPortfolioComponent] = useState<
		Array<Record<string, any>>
	>([{ id: 0, portfolioExperience: '' }]);
	const [portfolioExperienceSelected, setPortfolioExperienceSelected] =
		useState(new Map<string, string[]>());

	const { control, watch, handleSubmit } =
		useForm<CreateProfilePortfolioInputSchema>({
			mode: 'onChange',
		});

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			setPortfolioExperienceSelected(
				// @ts-expect-error
				(prevMap) => new Map(prevMap.set(name, value[name]))
			);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit = () => {
		const portfolio = [];

		if (
			portfolioComponent.length === 1 &&
			portfolioExperienceSelected.has('company')
		) {
			portfolio.push(JSON.parse(stringifyMap(portfolioExperienceSelected)));
		}

		portfolioComponent.map((item) => {
			if (item.portfolioExperience !== '') {
				portfolio.push(JSON.parse(item.portfolioExperience));
			}
		});

		updateProfile({
			portfolio: JSON.stringify(portfolio),
		});
	};

	const handleAddPortfolioTextFields = () => {
		setPortfolioComponent((prevState) =>
			prevState.concat({
				id: prevState[0].id++ as number,
				portfolioExperience: stringifyMap(portfolioExperienceSelected),
			})
		);
	};

	const handleRemovePortfolioTextFields = (id: number) => {
		setPortfolioComponent((prevState) =>
			prevState.filter((item) => item.id !== id)
		);
	};

	const handlePortfolioDocumentsUploadChange = (url: string) =>
		setDocumentUrls(url);
	const handlePortfolioImagesUploadChange = (url: string) => setImageUrls(url);
	const handlePortfolioVideosUploadChange = (url: string) => setVideoUrls(url);

	return (
		<form
			name='profile-portfolio'
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
						List different portfolio projects to boost your chances of getting
						hired
					</Typography>
				</Grid>

				<Grid item xs={12}>
					{portfolioComponent
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
								<PortfolioInput
									id={item.id}
									control={control}
									handleDelete={handleRemovePortfolioTextFields}
									handlePortfolioDocumentsUploadChange={
										handlePortfolioDocumentsUploadChange
									}
									handlePortfolioImagesUploadChange={
										handlePortfolioImagesUploadChange
									}
									handlePortfolioVideosUploadChange={
										handlePortfolioVideosUploadChange
									}
								/>
							</Stack>
						))}
				</Grid>

				<Grid item xs={12}>
					<Button
						startIcon={<AddCircle fontSize='large' />}
						variant='contained'
						onClick={handleAddPortfolioTextFields}
						sx={{ color: 'unset', fontWeight: 'medium' }}
					>
						ADD PORTFOLIO
					</Button>
				</Grid>
			</Grid>

			<ProfileBottomNavigation
				isSuccess={isSuccess}
				loading={loading}
				nextPageUrl='/profile'
				nextPageTitle='Finish'
			/>
		</form>
	);
}
