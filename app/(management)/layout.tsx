import { ReactNode } from 'react';
import { Main } from '@/components/layouts';
import Container from '@/components/container';

interface ManagementLayoutProps {
	children: ReactNode;
}

export default async function ManagementLayout({
	children,
}: ManagementLayoutProps) {
	return (
		<Main>
			<Container padding={0}>
				<Container maxWidth={720} paddingY={0}>
					{children}
				</Container>
			</Container>
		</Main>
	);
}
