export type Maybe<T> = T | null;

export type Tuple<T> = [T, T];

declare module 'react-select-country-list';

interface Candidate {
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

interface User {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	is_employer?: boolean;
	is_candidate?: boolean;
	is_both_employer_and_candidate?: boolean;
}

export interface CandidateProfile extends Candidate {
	id: string;
	user: User;
}

export interface Job {
	id: number;
	user_id: number;
	specialism_id: number;
	industry_id: number;
	contract_type_id: number;
	education_level_id: number;
	experience_id: number;
	jobs_title: string;
	search_and_listing: number;
	experience_length: string;
	experience_level: string;
	qualifications_competencies: string;
	duties_responsibilities: string;
	offered_salary: string;
	address: string;
	country: string;
	city: string;
	email: string;
	gender: number;
	languages: string;
	is_active: boolean;
	jobs_description: string;
	created_at: Date;
	updated_at: Date;
	application_deadline: Date;
	is_company_name_hidden: boolean;
}

export interface ContractType {
	id: number | string;
	contract_types_name: string;
	created_at: Date;
	updated_at: Date;
}
