import type { ReactNode } from 'react';

export interface InputProps {
	name: string;
	control: any;
	label: string;
	setValue?: any;
	Icon?: ReactNode;
	iconPosition?: 'start' | 'end';

	[x: string]: any;
}
