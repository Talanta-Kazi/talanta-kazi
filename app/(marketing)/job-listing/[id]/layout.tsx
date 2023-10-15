import { ReactNode } from 'react';

import Container from '@/components/container';

interface SingleJobListingLayoutProps {
	children: ReactNode;
}

export default async function SingleJobListingLayout({
	children,
}: SingleJobListingLayoutProps) {
	return <Container maxWidth={{ md: 960, sm: 720 }}>{children}</Container>;
}
