import {
	AdminBottomNavigationMenus,
	BottomNavigationMenus,
} from '@/components/menu-routes';
// components
import { ComponentContext } from '@/context/ComponentContext';
// third party
import {
	BottomNavigation,
	BottomNavigationAction,
	Box,
	CssBaseline,
	Paper,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useContext } from 'react';

const PageBottomNavigation = (): JSX.Element => {
	const { selectedIndex, setSelectedIndex } = useContext(ComponentContext);
	const { pathname } = useRouter();
	const theme = useTheme();

	const switchUserNavigation = (pathname: string) => {
		switch (pathname) {
			case '/dashboard':
				return BottomNavigationMenus;
			case '/admin':
				return AdminBottomNavigationMenus;
			case '/developer':
				return AdminBottomNavigationMenus;
			default:
				return BottomNavigationMenus;
		}
	};

	const handleChange = (event: any, newValue: number) =>
		setSelectedIndex(newValue);

	return (
		<Box sx={{ pb: 7 }}>
			<CssBaseline />
			<Paper
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					backgroundColor: 'alternate.main',
					borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				}}
				elevation={0}
				data-testid='bottom-navigation'
			>
				<BottomNavigation
					value={selectedIndex}
					onChange={handleChange}
					showLabels
				>
					{switchUserNavigation(pathname).map((menuNav, index) => (
						<BottomNavigationAction
							// sx={{ fontSize: 10 }}
							key={menuNav.label}
							label={menuNav.label}
							icon={menuNav.icon}
							value={index}
						/>
					))}
				</BottomNavigation>
			</Paper>
		</Box>
	);
};

export default PageBottomNavigation;
