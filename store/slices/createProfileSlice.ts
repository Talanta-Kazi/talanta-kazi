import { StateCreator } from 'zustand';

export interface Profile {
	id: number;
	user_id: number;
	profile_pic: string;
	specialism_id: string;
	experiences_id: number;
	education_levels_id: number;
	job_title: string;
	personal_statement: string;
	personal: string;
	biography: string;
	education: string;
	experience: string;
	portfolio: string;
	skills: string;
	honors?: any;
	availability_status: number;
	metadata?: any;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date;
}

export interface ProfileSlice {
	profile: Profile | null;
	setProfile: (profile: Profile) => void;
}

export const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
	profile: {
		id: 0,
		user_id: 0,
		profile_pic: '',
		specialism_id: '',
		experiences_id: 0,
		education_levels_id: 0,
		job_title: '',
		personal_statement: '',
		personal: '',
		biography: '',
		education: '',
		experience: '',
		portfolio: '',
		skills: '',
		honors: null,
		availability_status: 0,
		metadata: null,
		created_at: new Date(),
		updated_at: new Date(),
		deleted_at: new Date(),
	},
	setProfile: (profile: Profile) =>
		set((state) => ({
			...state,
			profile,
		})),
});
