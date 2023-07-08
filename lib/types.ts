import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

export type NextPageWithAuthAndLayout = NextPage & {
	auth?: boolean;
	getLayout?: (page: ReactElement) => ReactNode;
};

export interface IUser {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	is_employer?: boolean;
	is_candidate?: boolean;
	is_both_employer_and_candidate?: boolean;
}

export interface GenericResponse {
	status: string;
	message: string;
}

export interface IUserResponse {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	bio?: string;
	profile_pic?: string;
	city?: string;
	country?: string;
	job_title?: string;
	availability_status?: string;
	is_employer?: boolean;
	is_candidate?: boolean;
	is_both_employer_and_candidate?: boolean;
}

export interface IProfileResponse {
	user: IUser;
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
	job_level: string;
	county: string;
	honors?: any;
	availability_status: number;
}

export interface IUserProfile {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	bio: string;
	profile_pic: string;
	city: string;
	country: string;
	job_title: string;
	availability_status: string;
	is_employer?: boolean;
	is_candidate?: boolean;
	is_both_employer_and_candidate?: boolean;
}

export interface JobInterestedDTO {
	user_id: string | number;
	job_id: string | number;
	created_at: Date;
	updated_at: Date;
}

export interface IJobInterestedResponse extends JobInterestedDTO {
	id: string;
}
