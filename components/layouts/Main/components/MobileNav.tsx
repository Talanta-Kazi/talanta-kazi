'use client';

import styles from '@/assets/css/mobile-menu.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useDelayedRender from 'use-delayed-render';
import { cn, lockScroll } from '@/lib/utils';
import { Button, Divider } from '@mui/material';
import { useSession } from 'next-auth/react';

function MenuIcon(props: JSX.IntrinsicElements['svg']) {
	return (
		<svg
			className='absolute h-7 w-7 text-gray-900 dark:text-gray-100'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			{...props}
		>
			<path
				d='M2.5 7.5H17.5'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M2.5 12.5H17.5'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

function CrossIcon(props: JSX.IntrinsicElements['svg']) {
	return (
		<svg
			className='absolute h-7 w-7 text-gray-900 dark:text-gray-100'
			viewBox='0 0 24 24'
			width='24'
			height='24'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
			fill='none'
			shapeRendering='geometricPrecision'
			{...props}
		>
			<path d='M18 6L6 18' />
			<path d='M6 6l12 12' />
		</svg>
	);
}

const MobileNav = () => {
	const { status } = useSession();
	const [navShow, setNavShow] = useState(false);
	const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
		navShow,
		{
			enterDelay: 20,
			exitDelay: 300,
		},
	);

	const onToggleNav = () => {
		setNavShow((status) => {
			if (status) {
				document.body.style.overflow = '';
			} else {
				document.body.style.overflow = 'hidden';
			}
			return !status;
		});
		lockScroll();
	};

	useEffect(() => {
		return function cleanup() {
			document.body.style.overflow = '';
		};
	}, []);

	return (
		<div className='ml-2 sm:hidden'>
			<button
				className={cn(styles.burger, 'visible md:hidden')}
				aria-label='Toggle menu'
				type='button'
				onClick={onToggleNav}
			>
				<MenuIcon data-hide={navShow} />
				<CrossIcon data-hide={!navShow} />
			</button>
			{isMenuMounted && (
				<ul
					className={cn(
						styles.menu,
						'absolute flex flex-col bg-white antialiased transition duration-500 dark:bg-gray-900',
						isMenuRendered && styles.menuRendered,
					)}
				>
					<li
						onClick={onToggleNav}
						className='px-8 pt-8 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-gray-100'
						style={{ transitionDelay: '150ms' }}
					>
						<Link href='/' className='flex w-auto pb-4'>
							Home
						</Link>
					</li>
					<Divider />
					<li
						onClick={onToggleNav}
						className='border-b border-gray-300 px-8 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-gray-100'
						style={{ transitionDelay: '200ms' }}
					>
						<Link href='/job-listing' className='flex w-auto pb-4'>
							Find a job
						</Link>
					</li>
					<Divider />
					<li
						onClick={onToggleNav}
						className='border-b border-gray-300 px-8 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-gray-100'
						style={{ transitionDelay: '200ms' }}
					>
						<Link href='/post-a-job' className='flex w-auto pb-4'>
							Post a job
						</Link>
					</li>
					<Divider />
					<li
						className='border-b border-gray-300 px-8 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-gray-100'
						style={{ transitionDelay: '250ms' }}
					>
						<Link href='/find-candidate' className='flex w-auto pb-4'>
							Find candidates
						</Link>
					</li>
					<Divider />
					<li
						onClick={onToggleNav}
						className='border-b border-gray-300 px-8 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-gray-100'
						style={{ transitionDelay: '300ms' }}
					>
						<Link href='/employers' className='flex w-auto pb-4'>
							Employers
						</Link>
					</li>
					<Divider />
					<li>
						<Button
							component={Link}
							variant='contained'
							color='primary'
							size='large'
							fullWidth
							href={status === 'authenticated' ? '/candidate/jobs' : '/login'}
						>
							{status === 'authenticated' ? 'Dashboard' : 'Login'}
						</Button>
					</li>
				</ul>
			)}
		</div>
	);
};

export default MobileNav;
