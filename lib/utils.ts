import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
};
