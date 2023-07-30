'use client';

import {
	Step,
	StepLabel,
	Stepper,
	Theme,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { usePathname } from 'next/navigation';

const steps = [
	{
		label: 'Personal details',
		url: '/create-profile/title',
	},
	{
		label: 'Speciality',
		url: '/create-profile/speciality',
	},
	{
		label: 'Education',
		url: '/create-profile/personal-details',
	},
	{
		label: 'Bio',
		url: '/create-profile/personal-details',
	},
	{
		label: 'Work',
		url: '/create-profile/personal-details',
	},
	{
		label: 'Portfolio',
		url: '/create-profile/personal-details',
	},
];

export default function ProfileStepper() {
	const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
	const pathname = usePathname();
	const activeStep = steps.findIndex((step) => step.url === pathname);

	return (
		<Stepper
			activeStep={activeStep}
			orientation={isMd ? 'vertical' : 'horizontal'}
			sx={{ display: { md: 'block', xs: 'none' }, position: 'absolute' }}
		>
			{steps.map((step, index) => (
				<Step key={step.label}>
					<StepLabel
						optional={
							index === 5 ? (
								<Typography variant='caption'>Last step</Typography>
							) : null
						}
					>
						{step.label}
					</StepLabel>
				</Step>
			))}
		</Stepper>
	);
}
