import { ReactNode } from 'react';

import { Main } from '@/components/layouts';

interface CandidateLayoutProps {
	children: ReactNode;
}

export default async function MarketingLayout({
	children,
}: CandidateLayoutProps) {
	return <Main>{children}</Main>;
}
