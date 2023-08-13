const sideLayoutNavigation = [
	{
		title: 'Find a job',
		href: '/find-a-job',
	},
	{
		title: 'Post a job',
		href: '/post-a-job',
	},
	{
		title: 'Find candidates',
		href: '/find-candidates',
	},
] as const;

const mainLayoutNavigation = [
	{
		title: "Talent's page",
		href: '/talent-page',
	},
	{
		title: 'Find a job',
		href: '/find-a-job',
	},
	{
		title: 'Post a job',
		href: '/post-a-job',
	},
	{
		title: 'Find candidates',
		href: '/find-candidates',
	},
	{
		title: 'Employers',
		href: '/employers',
	},
] as const;

const candidatesLayoutNavigation = [
	{
		title: 'Find work',
		href: '/candidate/jobs',
	},
	{
		title: 'Saved jobs',
		href: '/candidate/saved-jobs',
	},
	{
		title: 'My jobs',
		href: '/candidate/my-jobs',
	},
] as const;

const employerLayoutNavigation = [
	{
		title: 'All jobs',
		href: '/employer/jobs',
	},
	{
		title: 'Candidates',
		href: '/employer/saved-jobs',
	},
	{
		title: 'Reports',
		href: '/employer/my-jobs',
	},
] as const;

export {
	sideLayoutNavigation,
	mainLayoutNavigation,
	candidatesLayoutNavigation,
	employerLayoutNavigation,
};
