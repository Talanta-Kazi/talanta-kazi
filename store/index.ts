import { create } from 'zustand';
import { createSnackSlice, SnackSlice } from '@/store/slices/createSnackSlice';
import {
	createProfileSlice,
	ProfileSlice,
} from '@/store/slices/createProfileSlice';

const useStore = create<SnackSlice & ProfileSlice>()((...a) => ({
	...createSnackSlice(...a),
	...createProfileSlice(...a),
}));

export default useStore;
