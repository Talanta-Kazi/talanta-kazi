// import EnvironmentControlView from 'views/EnvironmentControlView';
// import PeopleView from 'views/PeopleView';
// import SupportView from 'views/SupportView';
// import UserRolesView from 'views/UserRolesView';
import type { ReactNode } from 'react';

import {
	AllOut,
	BubbleChart,
	ControlCamera,
	LocalFlorist,
	Memory,
	Opacity,
	People,
	Security,
	Spa,
	WidgetsRounded,
} from '@mui/icons-material';

export interface MenuComponentProps {
	primaryText: string;
	icon: ReactNode;
	id: string;
	href: string;
}

export interface MenuBottomProps {
	label: string;
	icon: ReactNode;
	value: string;
}

export const UserMenus: MenuComponentProps[] = [
	{
		icon: <WidgetsRounded />,
		primaryText: 'Analytics',
		id: 'analytics',
		href: '/analytics',
	},
	{
		icon: <Opacity />,
		primaryText: 'Water Cycles',
		id: 'water-cycles',
		href: '/analytics',
	},
	{
		icon: <ControlCamera />,
		primaryText: 'Environment',
		id: 'environment',
		href: '/analytics',
	},
	{
		icon: <Security />,
		primaryText: 'Quality Control',
		id: 'quality-control',
		href: '/analytics',
	},
	{
		icon: <Memory />,
		primaryText: 'Energy Usage',
		id: 'energy-usage',
		href: '/analytics',
	},
	{
		icon: <LocalFlorist />,
		primaryText: 'Support',
		id: 'support',
		href: '/analytics',
	},
];

export const AdminMenus: MenuComponentProps[] = [
	{
		icon: <WidgetsRounded />,
		primaryText: 'Analytics',
		href: '/analytics',
		id: 'analytics',
	},
	{
		icon: <AllOut />,
		primaryText: 'Devices',
		href: '/analytics',
		id: 'devices',
	},
	{
		icon: <People />,
		primaryText: 'People',
		href: '/analytics',
		id: 'people',
	},
	{
		icon: <BubbleChart />,
		primaryText: 'Roles',
		href: '/analytics',
		id: 'roles',
	},
	{
		icon: <Spa />,
		primaryText: 'Support',
		href: '/analytics',
		id: 'support',
	},
];

export const BottomNavigationMenus: MenuBottomProps[] = [
	{
		icon: <WidgetsRounded fontSize={'small'} />,
		label: 'Analytics',
		value: 'analytics',
	},
	{
		icon: <Opacity fontSize={'small'} />,
		label: 'Water',
		value: 'water',
	},
	{
		icon: <ControlCamera fontSize={'small'} />,
		label: 'Environment',
		value: 'environment',
	},
	{
		icon: <Security fontSize={'small'} />,
		label: 'Quality',
		value: 'quality',
	},
	{
		icon: <Memory fontSize={'small'} />,
		label: 'Energy',
		value: 'energy',
	},
];

export const AdminBottomNavigationMenus: MenuBottomProps[] = [
	{
		icon: <WidgetsRounded fontSize={'small'} />,
		label: 'Analytics',
		value: 'analytics',
	},
	{
		icon: <AllOut fontSize={'small'} />,
		label: 'Devices',
		value: 'devices',
	},
	{
		icon: <People fontSize={'small'} />,
		label: 'People',
		value: 'people',
	},
	{
		icon: <BubbleChart fontSize={'small'} />,
		label: 'Roles',
		value: 'roles',
	},
	{
		icon: <Spa fontSize={'small'} />,
		label: 'Requests',
		value: 'requests',
	},
];
