import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { parse } from 'node-html-parser';

import { env } from '@/env.mjs';

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
};
