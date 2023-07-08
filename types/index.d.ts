export type Maybe<T> = T | null;

export type Tuple<T> = [T, T];

interface ICandidates {
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

interface IUser {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	is_employer?: boolean;
	is_candidate?: boolean;
	is_both_employer_and_candidate?: boolean;
}

export interface ICandidateProfile extends ICandidates {
	id: string;
	user: IUser;
}
