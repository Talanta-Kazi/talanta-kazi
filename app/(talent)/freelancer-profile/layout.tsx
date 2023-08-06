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
		url: '/freelancer-profile/personal',
	},
	{
		label: 'Speciality',
		url: '/freelancer-profile/speciality',
	},
	{
		label: 'Bio',
		url: '/freelancer-profile/bio',
	},
	{
		label: 'Education',
		url: '/freelancer-profile/education',
	},
	{
		label: 'Work',
		url: '/freelancer-profile/work',
	},
	{
		label: 'Portfolio',
		url: '/freelancer-profile/portfolio',
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
