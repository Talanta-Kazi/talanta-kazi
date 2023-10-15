'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { type MouseEvent } from 'react';
import { useEffect, useState } from 'react';

import Container from '@/components/container';
import useLocalStorage from '@/lib/hooks/use-local-storage';
import { fancyId } from '@/lib/utils';
import { AllOutTwoTone, SpaTwoTone, WorkTwoTone } from '@mui/icons-material';

/* eslint-disable react/no-unescaped-entities */
import {
	Avatar,
	Box,
	Button,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

const mock = [
	{
		icon: <SpaTwoTone fontSize='large' color='action' />,
		title: 'I am a freelancer',
		value: 'freelancer',
	},
	{
		icon: <AllOutTwoTone fontSize='large' color='action' />,
		title: 'I am a professional',
		value: 'professional',
	},
	{
		icon: <WorkTwoTone fontSize='large' color='action' />,
		title: 'I am a consultant',
		value: 'consultant',
	},
];

type LinkToDashboardViews = {
	[key: string]: string;
};

const SelectUserType = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});
	const { push } = useRouter();
	const [storedValue, setLocalStorage] = useLocalStorage(
		'userType',
		'freelancer'
	);

	const [alignment, setAlignment] = useState<string>('...');
	const [activeState, setActiveState] = useState('');

	useEffect(() => {
		switch (alignment) {
			case 'freelancer':
				setActiveState('freelancer');
				setLocalStorage('freelancer');
				return;
			case 'professional':
				setActiveState('professional');
				setLocalStorage('professional');
				return;
			case 'consultant':
				setActiveState('consultant');
				setLocalStorage('consultant');
				return;
			default:
				setActiveState('...');
				return;
		}
	}, [alignment]);

	const handlePushToDashboardViews = () => {
		switch (alignment) {
			case 'freelancer':
				push('/employer/analytics');
				return;
			case 'professional':
				push('/candidate/jobs');
				return;
			case 'consultant':
				push('/candidate/jobs');
				return;
			default:
				return;
		}
	};

	const linkToDashboardViews: LinkToDashboardViews = {
		consultant: '/consultant-profile/personal',
		freelancer: '/freelancer-profile/personal',
		professional: '/professional-profile/personal',
	} as const;

	const handleAlignment = (
		event: MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setAlignment(newAlignment);
	};

	return (
		<Container marginTop={isMd ? 16 : 2}>
			<Stack
				direction='column'
				justifyContent='center'
				alignItems='center'
				spacing={2}
			>
				<Box>
					<Typography
						variant='h4'
						align={'center'}
						sx={{
							fontWeight: 700,
						}}
					>
						Choose talent profile
					</Typography>
				</Box>
				<ToggleButtonGroup
					color='primary'
					size='small'
					value={alignment}
					orientation={isMd ? 'horizontal' : 'vertical'}
					exclusive
					onChange={handleAlignment}
					aria-label='Profile type'
				>
					{mock.map((item) => (
						<Box
							key={fancyId()}
							value={item.value}
							component={ToggleButton}
							paddingX={2}
							width={1}
							height={isMd ? '200px' : 1}
							marginX={0}
						>
							<Stack
								direction={isMd ? 'column' : 'row'}
								justifyContent='flex-start'
								alignItems='center'
								width={isMd ? 200 : '80vw'}
							>
								<Box
									component={Avatar}
									width={isMd ? 60 : 48}
									height={isMd ? 60 : 48}
									marginBottom={isMd ? 2 : 0}
									marginRight={isMd ? 0 : 2}
									bgcolor={alpha(theme.palette.primary.main, 0.3)}
									color={theme.palette.primary.main}
									variant='rounded'
								>
									{item.icon}
								</Box>

								<Stack
									direction='column'
									justifyContent='space-around'
									alignItems='start'
									spacing={4}
								>
									<Typography
										variant={'h6'}
										gutterBottom
										sx={{ fontWeight: 500 }}
									>
										{item.title}
									</Typography>
								</Stack>
							</Stack>
						</Box>
					))}
				</ToggleButtonGroup>
				<Box
					display='flex'
					flexDirection={{ sm: 'row', xs: 'column' }}
					alignItems={{ sm: 'flex-start', xs: 'stretched' }}
					justifyContent={'center'}
					marginTop={isMd ? 12 : 4}
				>
					<Link
						href={linkToDashboardViews[alignment] ?? '/professional-title/jobs'}
					>
						<Button
							variant='contained'
							color='primary'
							size='large'
							fullWidth={!isMd}
							endIcon={
								alignment !== '...' ||
								(alignment === null && (
									<Box
										component='svg'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										width={24}
										height={24}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M17 8l4 4m0 0l-4 4m4-4H3'
										/>
									</Box>
								))
							}
						>
							{`Proceed as ${
								alignment ? alignment.split('-').join(' ') : '...'
							}`}
						</Button>
					</Link>
				</Box>
			</Stack>
		</Container>
	);
};

export default SelectUserType;
