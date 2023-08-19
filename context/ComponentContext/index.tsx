import type { MouseEvent, SyntheticEvent } from 'react';
import { createContext, useState } from 'react';

import { isBrowser } from '@/lib/utils';
import { useSession } from 'next-auth/react';

import type {
	ComponentContextProps,
	ComponentContextState,
} from './interfaces';

const selectedIndex = JSON.parse(
	isBrowser ? (window.localStorage.getItem('selectedIndex') as string) : '0'
) as number;

const currentRoleBasedAccess =
	typeof window === 'undefined'
		? 'USER'
		: window.localStorage.getItem('currentRoleBasedAccess');

const ComponentContext = createContext({
	activityLogsViewed: false,
	csrfToken: '',
	currentRoleBasedAccess: currentRoleBasedAccess || 'USER',
	handleCloseDeviceModal: () => {},
	handleCloseSnack: (e: any) => {},
	handleSelectDeviceModal: () => {},
	isActivityDrawerOpen: false,
	isAdmin: false,
	isChangeRoleDialogOpen: false,
	isDeveloper: false,
	isMenuOpen: false,
	isSelectDeviceModalOpen: false,
	isSnackOpen: false,
	selectedIndex: selectedIndex ?? 0,
	setCsrfToken: (_csrfToken: string) => {},
	setCurrentRoleBasedAccess: (_role: string) => {},
	setDeviceModalOpen: (_open: boolean) => {},
	setMenuOpen: (_open: boolean) => {},
	setOpenSnack: (_open: boolean) => {},
	setSelectedIndex: (_selectedIndex: number) => {},
	setSnackMessage: (_message: string) => {},
	snackMessage: '',
	toggleActivityDrawer: (
		_isActivityDrawerOpen: boolean,
		_activityLogsViewed: boolean
	) => {},
	toggleRoleChangeDialog: () => {},
});

const ComponentProvider = ({
	children,
	...props
}: ComponentContextProps): JSX.Element => {
	const [state, setState] = useState<ComponentContextState>({
		isOpen: false,
		isMenuOpen: false,
		selectedIndex:
			JSON.parse(
				typeof window !== 'undefined'
					? (window.localStorage.getItem('selectedIndex') as string)
					: '0'
			) ?? 0,
		// JSON.parse(window.localStorage.getItem('selectedIndex') as string) || 0,
		isSelectDeviceModalOpen: false,
		isActivityDrawerOpen: false,
		isChangeRoleDialogOpen: false,
		activityLogsViewed: false,
		isSnackOpen: false,
		snackMessage: '',
		csrfToken: '',
		currentRoleBasedAccess:
			typeof window === 'undefined'
				? 'USER'
				: (window.localStorage.getItem('currentRoleBasedAccess') as string),
	});

	// useEffect(() => {
	// 	if (typeof window.localStorage.getItem('selectedIndex') === 'undefined') {
	// 		window.localStorage.setItem('selectedIndex', '0');
	// 	}
	// }, []);

	const { data: session } = useSession();
	const role = session?.user?.role || 'USER';
	const isAdmin = state.currentRoleBasedAccess === 'ADMIN' && role === 'ADMIN';
	const isDeveloper =
		state.currentRoleBasedAccess === 'DEVELOPER' && role === 'DEVELOPER';

	const setMenuOpen = (isOpen: boolean) =>
		setState((prevState) => ({ ...prevState, isMenuOpen: isOpen }));

	const setOpenSnack = (isOpen: boolean) =>
		setState((prevState) => ({ ...prevState, isSnackOpen: isOpen }));

	const setSnackMessage = (message: string) =>
		setState((prevState) => ({ ...prevState, snackMessage: message }));

	const setSelectedIndex = (selectedIndex: number) => {
		setState((prevState) => ({ ...prevState, selectedIndex }));
		window.localStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));
	};

	const setCurrentRoleBasedAccess = (role: string) => {
		setState((prevState) => ({
			...prevState,
			currentRoleBasedAccess: role,
		}));
		window.localStorage.setItem('currentRoleBasedAccess', role);
	};

	const setDeviceModalOpen = (isModalOpen: boolean) => {
		setState((prevState) => ({
			...prevState,
			isSelectDeviceModalOpen: isModalOpen,
		}));
	};

	const toggleActivityDrawer = (
		isActivityDrawerOpen: boolean,
		activityLogsViewed: boolean
	) => {
		setState((prevState) => ({
			...prevState,
			isActivityDrawerOpen,
			activityLogsViewed,
		}));
	};

	const toggleRoleChangeDialog = () => {
		setState((prevState) => ({
			...prevState,
			isChangeRoleDialogOpen: !prevState.isChangeRoleDialogOpen,
			anchorEl: null,
		}));
	};

	const handleSelectDeviceModal = () => {
		setState((prevState) => ({
			...prevState,
			isSelectDeviceModalOpen: !prevState.isSelectDeviceModalOpen,
		}));
	};

	const handleCloseDeviceModal = () => {
		setState((prevState) => ({
			...prevState,
			isSelectDeviceModalOpen: !prevState.isSelectDeviceModalOpen,
		}));
	};

	const handleCloseSnack = (
		event: SyntheticEvent | MouseEvent,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setState((prevState) => ({ ...prevState, isSnackOpen: false }));
	};

	const setCsrfToken = (csrfToken: string) =>
		setState((prevState) => ({ ...prevState, csrfToken: csrfToken }));

	const {
		// eslint-disable-next-line no-shadow
		selectedIndex,
		isMenuOpen,
		isSelectDeviceModalOpen,
		isActivityDrawerOpen,
		isChangeRoleDialogOpen,
		activityLogsViewed,
		isSnackOpen,
		snackMessage,
		csrfToken,
		currentRoleBasedAccess,
	} = state;

	return (
		<ComponentContext.Provider
			value={{
				activityLogsViewed,
				csrfToken,
				currentRoleBasedAccess,
				handleCloseDeviceModal,
				handleCloseSnack,
				handleSelectDeviceModal,
				isActivityDrawerOpen,
				isAdmin,
				isChangeRoleDialogOpen,
				isDeveloper,
				isMenuOpen,
				isSelectDeviceModalOpen,
				isSnackOpen,
				selectedIndex,
				setCsrfToken,
				setCurrentRoleBasedAccess,
				setDeviceModalOpen,
				setMenuOpen,
				setOpenSnack,
				setSelectedIndex,
				setSnackMessage,
				snackMessage,
				toggleActivityDrawer,
				toggleRoleChangeDialog,
				...props,
			}}
		>
			{children}
		</ComponentContext.Provider>
	);
};

export { ComponentContext, ComponentProvider };
