import { ReactNode } from 'react';
import { Minimal } from '@/components/layouts';
import ProfileStepper from '@/app/(candidate)/create-profile/stepper';
import Container from '@/components/container';

interface AuthLayoutProps {
	children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<Minimal>
			<Container>
				<ProfileStepper />
				<Container maxWidth={720} paddingY={0}>
					{children}
				</Container>
			</Container>
		</Minimal>
	);
}
