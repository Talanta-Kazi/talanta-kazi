import { ReactNode } from 'react';

import Container from '@/components/container';
import { Main } from '@/components/layouts';

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
