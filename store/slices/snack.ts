import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type Severity = 'success' | 'error';

export interface SnackMessage {
	message: string;
	severity?: Severity;
}

const snackInitialState: SnackMessage = {
	message: '',
	severity: 'success',
};

export const snackSlice = createSlice({
	name: 'snack',
	initialState: snackInitialState,
	reducers: {
		displaySnackMessage(state, { payload }: PayloadAction<SnackMessage>) {
			state.message = payload.message;
			state.severity = payload.severity;
		},
		reset: (state) => {
			state.message = '';
		},
	},
});

export const { displaySnackMessage, reset } = snackSlice.actions;
