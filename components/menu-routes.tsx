// import EnvironmentControlView from 'views/EnvironmentControlView';
// import PeopleView from 'views/PeopleView';
// import SupportView from 'views/SupportView';
// import UserRolesView from 'views/UserRolesView';
import { type ReactNode } from 'react';

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
		href: '/analytics',
		icon: <WidgetsRounded />,
		id: 'analytics',
		primaryText: 'Analytics',
	},
	{
		href: '/analytics',
		icon: <Opacity />,
		id: 'water-cycles',
		primaryText: 'Water Cycles',
	},
	{
		href: '/analytics',
		icon: <ControlCamera />,
		id: 'environment',
		primaryText: 'Environment',
	},
	{
		href: '/analytics',
		icon: <Security />,
		id: 'quality-control',
		primaryText: 'Quality Control',
	},
	{
		href: '/analytics',
		icon: <Memory />,
		id: 'energy-usage',
		primaryText: 'Energy Usage',
	},
	{
		href: '/analytics',
		icon: <LocalFlorist />,
		id: 'support',
		primaryText: 'Support',
	},
];

export const AdminMenus: MenuComponentProps[] = [
	{
		href: '/analytics',
		icon: <WidgetsRounded />,
		id: 'analytics',
		primaryText: 'Analytics',
	},
	{
		href: '/analytics',
		icon: <AllOut />,
		id: 'devices',
		primaryText: 'Devices',
	},
	{
		href: '/analytics',
		icon: <People />,
		id: 'people',
		primaryText: 'People',
	},
	{
		href: '/analytics',
		icon: <BubbleChart />,
		id: 'roles',
		primaryText: 'Roles',
	},
	{
		href: '/analytics',
		icon: <Spa />,
		id: 'support',
		primaryText: 'Support',
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
