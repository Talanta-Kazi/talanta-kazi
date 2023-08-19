import {
	ProfileSlice,
	createProfileSlice,
} from '@/store/slices/createProfileSlice';
import { SnackSlice, createSnackSlice } from '@/store/slices/createSnackSlice';
import { create } from 'zustand';

const useStore = create<SnackSlice & ProfileSlice>()((...a) => ({
	...createSnackSlice(...a),
	...createProfileSlice(...a),
}));

export default useStore;
