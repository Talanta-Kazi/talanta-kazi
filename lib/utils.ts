import { env } from '@/env.mjs';
import { type ClassValue, clsx } from 'clsx';
import { parse } from 'node-html-parser';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function formatDate(input: string | number): string {
	const date = new Date(input);
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
}

function absoluteUrl(path: string) {
	return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

function dateSortDesc(a: string, b: string) {
	if (a > b) return -1;
	if (a < b) return 1;
	return 0;
}

const slugify = (str: string) =>
	str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');

const fancyId = (): string => {
	const head = Date.now().toString(36);
	const tail = Math.random().toString(36).substr(2, 9);
	return `_${head}${tail}`;
};

const isObjectEmpty = (obj: Record<string, any>) =>
	Object.keys(obj).length === 0;

const isArrayEmpty = <T, _>(arr: T[]): boolean =>
	Array.isArray(arr) && !arr.length;

const isBrowser: boolean = ((): boolean => typeof document !== 'undefined')();

/**
 * Locks the scroll of the document by adding a 'lock-scroll' class to the html element.
 * The 'lock-scroll' class should be defined in a global stylesheet and contain styles for disabling scrolling.
 */
function lockScroll() {
	const root = document.getElementsByTagName('html')[0];
	root?.classList.toggle('lock-scroll'); // class is define in the global.css
}

/**
 * Removes the scroll lock from the document by removing the 'lock-scroll' class from the html element.
 */
function removeScrollLock() {
	const root = document.getElementsByTagName('html')[0];
	root?.classList.remove('lock-scroll'); // class is defined in the global.css
}

const stripHtml = (html: string) => {
	return parse(html).text;

	// const doc = new DOMParser().parseFromString(html, "text/html");
	// return doc.body.textContent || "";
};

const removeDuplicates = <T>(arr: T[]): T[] => [...new Set(arr)];

const stringifyMap = (valueMap: {
	entries: () => Iterable<readonly [PropertyKey, any]>;
	delete: (arg0: any) => void;
}) => {
	for (const [key] of valueMap.entries()) {
		if (key === undefined) {
			valueMap.delete(key);
		}
	}
	return JSON.stringify(Object.fromEntries(valueMap.entries()));
};

const objectToMap = (obj: Record<string, string[]>): Map<string, string[]> =>
	new Map(Object.entries(obj));

const isStringNullOrEmpty = (str: string): boolean =>
	str == null || str.trim() === '';

const mutateStringObject = (
	str: string,
	obj: Record<string, string>
): string => {
	console.log('Class: , Function: mutateStringObject, Line 100 ():', str, obj);
	const stringToObject = JSON.parse(str);
	return JSON.stringify({ ...stringToObject, ...obj });
};

export {
	cn,
	dateSortDesc,
	fancyId,
	slugify,
	isObjectEmpty,
	isBrowser,
	isArrayEmpty,
	formatDate,
	absoluteUrl,
	lockScroll,
	removeScrollLock,
	stripHtml,
	removeDuplicates,
	stringifyMap,
	isStringNullOrEmpty,
	mutateStringObject,
	objectToMap,
};
