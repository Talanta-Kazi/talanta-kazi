import { ReactNode } from 'react';
import { Minimal } from '@/components/layouts';
import ProfileStepper from '@/components/profile-stepper';
import Container from '@/components/container';

interface AuthLayoutProps {
	children: ReactNode;
}

const steps = [
	{
		label: 'Personal details',
		url: '/professional-profile/personal',
	},
	{
		label: 'Speciality',
		url: '/professional-profile/speciality',
	},
	{
		label: 'Bio',
		url: '/professional-profile/bio',
	},
	{
		label: 'Education',
		url: '/professional-profile/education',
	},
	{
		label: 'Work',
		url: '/professional-profile/work',
	},
	{
		label: 'Portfolio',
		url: '/professional-profile/portfolio',
	},
];

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<Minimal>
			<Container padding={0}>
				<ProfileStepper steps={steps} />
				<Container maxWidth={720} paddingY={0}>
					{children}
				</Container>
			</Container>
		</Minimal>
	);
}
