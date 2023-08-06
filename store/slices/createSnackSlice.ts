import { StateCreator } from 'zustand';

export type Severity = 'success' | 'error';

export interface SnackMessage {
	message: string;
	severity?: Severity;
}

export interface SnackSlice {
	snack: SnackMessage;
	displaySnackMessage: (snack: SnackMessage) => void;
	resetSnack: () => void;
}

export const createSnackSlice: StateCreator<SnackSlice> = (set) => ({
	snack: {
		message: '',
		severity: 'success',
	},
	displaySnackMessage: (snack: SnackMessage) =>
		set((state) => ({
			...state,
			snack,
		})),
	resetSnack: () =>
		set((state) => ({ ...state, snack: { message: '', severity: 'success' } })),
});
