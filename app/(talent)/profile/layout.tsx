import { ReactNode } from 'react';

import { Main } from '@/components/layouts';

interface CandidateLayoutProps {
	children: ReactNode;
}

export default async function ProfileLayout({
	children,
}: CandidateLayoutProps) {
	return <Main>{children}</Main>;
}
