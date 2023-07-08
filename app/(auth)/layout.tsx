import { ReactNode } from 'react';
import { Minimal } from '@/components/layouts';

interface AuthLayoutProps {
	children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return <Minimal>{children}</Minimal>;
}
