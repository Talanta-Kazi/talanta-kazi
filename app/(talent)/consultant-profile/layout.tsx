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
		url: '/consultant-profile/personal',
	},
	{
		label: 'Speciality',
		url: '/consultant-profile/speciality',
	},
	{
		label: 'Bio',
		url: '/consultant-profile/bio',
	},
	{
		label: 'Education',
		url: '/consultant-profile/education',
	},
	{
		label: 'Work',
		url: '/consultant-profile/work',
	},
	{
		label: 'Portfolio',
		url: '/consultant-profile/portfolio',
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
