import { ReactNode } from 'react';

import { Main } from '@/components/layouts';

interface MarketingLayoutProps {
	children: ReactNode;
}

export default async function MarketingLayout({
	children,
}: MarketingLayoutProps) {
	return <Main>{children}</Main>;
}
