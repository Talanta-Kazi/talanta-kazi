const sideLayoutNavigation = [
	{
		href: '/find-a-job',
		title: 'Find a job',
	},
	{
		href: '/post-a-job',
		title: 'Post a job',
	},
	{
		href: '/find-candidates',
		title: 'Find candidates',
	},
] as const;

const mainLayoutNavigation = [
	{
		href: '/talent-page',
		title: "Talent's page",
	},
	{
		href: '/find-a-job',
		title: 'Find a job',
	},
	{
		href: '/post-a-job',
		title: 'Post a job',
	},
	{
		href: '/find-candidates',
		title: 'Find candidates',
	},
	{
		href: '/employers',
		title: 'Employers',
	},
] as const;

const candidatesLayoutNavigation = [
	{
		href: '/candidate/jobs',
		title: 'Find work',
	},
	{
		href: '/candidate/saved-jobs',
		title: 'Saved jobs',
	},
	{
		href: '/candidate/my-jobs',
		title: 'My jobs',
	},
] as const;

const employerLayoutNavigation = [
	{
		href: '/employer/jobs',
		title: 'All jobs',
	},
	{
		href: '/employer/saved-jobs',
		title: 'Candidates',
	},
	{
		href: '/employer/my-jobs',
		title: 'Reports',
	},
] as const;

export {
	sideLayoutNavigation,
	mainLayoutNavigation,
	candidatesLayoutNavigation,
	employerLayoutNavigation,
};
