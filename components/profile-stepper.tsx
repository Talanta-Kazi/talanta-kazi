'use client';

import { usePathname } from 'next/navigation';

import {
	Step,
	StepLabel,
	Stepper,
	Theme,
	Typography,
	useMediaQuery,
} from '@mui/material';

interface Steps {
	steps: Array<{
		label: string;
		url: string;
	}>;
}

export default function ProfileStepper({ steps }: Steps) {
	const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
	const pathname = usePathname();
	const activeStep = steps.findIndex((step) => step.url === pathname);

	return (
		<Stepper
			activeStep={activeStep}
			orientation={'vertical'}
			// orientation={isMd ? 'vertical' : 'horizontal'}
			sx={{
				display: { md: 'block', xs: 'none' },
				position: 'absolute',
			}}
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
