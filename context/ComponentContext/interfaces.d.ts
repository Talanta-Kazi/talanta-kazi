import type { ReactNode } from 'react';

export interface ComponentContextProps {
	children: ReactNode;
}

export interface ComponentContextState {
	isOpen: boolean;
	isMenuOpen: boolean;
	selectedIndex: number;
	isSelectDeviceModalOpen: boolean;
	isActivityDrawerOpen: boolean;
	isChangeRoleDialogOpen: boolean;
	activityLogsViewed: boolean;
	isSnackOpen: boolean;
	snackMessage: string;
	csrfToken: string;
	currentRoleBasedAccess: string;
}
