import { ReactNode } from 'react';
import Container from '@/components/container';

interface SingleJobListingLayoutProps {
	children: ReactNode;
}

export default async function SingleJobListingLayout({
	children,
}: SingleJobListingLayoutProps) {
	return <Container maxWidth={{ sm: 720, md: 960 }}>{children}</Container>;
}
