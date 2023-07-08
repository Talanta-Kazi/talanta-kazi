import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface Notifications {
	id: string;
	primaryText?: string;
	secondaryText?: string;
	callToAction?: never;
	read?: boolean;
	fileName?: string;
}

export interface NotificationsState {
	notifications: Array<Notifications>;
}

const notificationsInitialState: NotificationsState = {
	notifications: [],
};

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState: notificationsInitialState,
	reducers: {
		addNotification(state, action: PayloadAction<Notifications>) {
			state.notifications.push(action.payload);
		},
		readNotification(state, action: PayloadAction<Partial<Notifications>>) {
			state.notifications = [...state.notifications].map((notification) => {
				return notification.id === action.payload.id
					? {
							...notification,
							read: true,
					  }
					: notification;
			});
		},
	},
});

export const { addNotification, readNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
