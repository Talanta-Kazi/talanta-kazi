import { getCandidateProfile } from '@/app/(talent)/actions';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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

interface ProfileState {
	profile: any;
	fetchProfile: (id: string) => Promise<void>;
}

// @ts-expect-error
const profileStore = (set) => ({
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
		created_at: null,
		updated_at: null,
		deleted_at: null,
	},
	fetchProfile: async (id: string) => {
		const data = await getCandidateProfile(id);
		console.log(
			'Class: profileStore, Function: fetchProfile, Line 59 data():',
			data
		);
		set({ profile: data });
	},
});

const useProfileStore = create<ProfileState>()(
	devtools(
		persist(profileStore, {
			name: 'profile',
		})
	)
);

export default useProfileStore;
