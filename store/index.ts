import type { ProfileSchema } from '@/lib/types';
import { create } from 'zustand';

import type { CandidateProfile } from '@/types';

export type Severity = 'success' | 'error';

export interface SnackMessage {
	message: string;
	severity?: Severity;
}

type Store = {
	authUser: Partial<CandidateProfile> | null;
	requestLoading: boolean;
	setAuthUser: (user: Partial<CandidateProfile> | null) => void;
	setRequestLoading: (isLoading: boolean) => void;
	snack: SnackMessage;
	displaySnackMessage: (snack: SnackMessage) => void;
	resetSnack: () => void;
	setUploadingImage: (isUploading: boolean) => void;
	uploadingImage: boolean;
	profile: Partial<ProfileSchema> | null;
	setProfile: (profile: Partial<ProfileSchema> | null) => void;
};

const useStore = create<Store>((set) => ({
	authUser: null,
	requestLoading: false,
	setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
	setRequestLoading: (isLoading) =>
		set((state) => ({ ...state, requestLoading: isLoading })),
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
	uploadingImage: false,
	setUploadingImage: (isUploading) =>
		set((state) => ({ ...state, uploadingImage: isUploading })),
	profile: null,
	setProfile: (profile) => set((state) => ({ ...state, profile })),
}));

export default useStore;
