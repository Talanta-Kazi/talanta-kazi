export interface Action {
	readonly type: string;

	[key: string]: any;
}

export interface PageMeta {
	firstPage?: string;
	currentPage?: string;
	nextPage?: string;
	previousPage?: string;
	page: number;
	pagesCount: number;
	totalCount: number;
}

export interface HistoryItem {
	id: string;
	action: string;
	actor: {
		tokenId: string;
		name: string;
	};
	activity: string;
	createdAt: string;
}

export interface ValidationObject {
	isValid: (value: any) => boolean;
	message: string;
}

export interface ErrorObject {
	response: {
		data: {
			message: any;
		};
		status: number;
	} | null;
}

export interface QueryParams {
	[key: string]: string;
}
