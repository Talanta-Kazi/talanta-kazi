/** @type {import("prettier").Config} */
module.exports = {
	arrowParens: 'always',
	semi: true,
	trailingComma: 'all',
	singleQuote: true,
	printWidth: 80,
	tabWidth: 2,
	useTabs: true,
	endOfLine: 'auto',
	jsxSingleQuote: true,
	bracketSpacing: true,
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
