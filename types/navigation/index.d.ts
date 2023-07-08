interface PageItem {
	groupTitle: string;
	pages: Array<{
		title: string;
		id?: string | number;
		href: string;
		target?: string;
	}>;
}
