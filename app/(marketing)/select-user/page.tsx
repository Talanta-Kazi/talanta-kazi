'use client';

import { useRouter } from 'next/navigation';

import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';

import Container from '@/components/container';
import { fancyId } from '@/lib/utils';
import { MenuBookTwoTone, WorkTwoTone } from '@mui/icons-material';

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
		title: 'I am a candidate',
		icon: <MenuBookTwoTone color='action' />,
		value: 'candidate',
	},
	{
		title: 'I am an employer',
		icon: <WorkTwoTone color='action' />,
		value: 'employer',
	},
];

type Alignment = 'employer' | 'candidate' | 'candidate-and-employer' | '...';

const SelectUserType = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});
	const { push } = useRouter();

	const [alignment, setAlignment] = useState('...');
	const [activeState, setActiveState] = useState('');

	useEffect(() => {
		switch (alignment) {
			case 'candidate':
				setActiveState('candidate');
				return;
			case 'employer':
				setActiveState('employer');
				return;
			default:
				setActiveState('...');
				return;
		}
	}, [alignment]);

	const handlePushToDashboardViews = () => {
		switch (alignment) {
			case 'employer':
				push('/employer/analytics');
				return;
			case 'candidate':
				push('/candidate/jobs');
				return;
			default:
				return;
		}
	};

	const handleAlignment = (
		event: MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setAlignment(newAlignment);
	};

	return (
		<Container
			width={800}
			marginTop={16}
			// sx={{
			// 	border: `1px solid ${theme.palette.divider}`,
			// 	borderRadius: 4,
			// }}
		>
			<Stack
				direction='column'
				justifyContent='center'
				alignItems='center'
				spacing={2}
			>
				<Box>
					<Typography
						variant='h5'
						align={'center'}
						sx={{
							fontWeight: 500,
						}}
					>
						Proceed as candidate or employer
					</Typography>
				</Box>
				<ToggleButtonGroup
					size='small'
					value={alignment}
					exclusive
					onChange={handleAlignment}
					aria-label='text alignment'
					sx={{
						marginTop: 4,
					}}
				>
					{mock.map((item) => (
						<Box
							key={fancyId()}
							value={item.value}
							component={ToggleButton}
							paddingX={4}
							width={1}
							height='200px'
							marginX={0}
							border={1}
							sx={{
								border: `1px solid ${theme.palette.divider}`,
								borderRadius: 2,
							}}
						>
							<Stack
								direction='column'
								justifyContent='center'
								alignItems='flex-start'
								width={200}
							>
								<Stack
									direction='row'
									justifyContent='space-between'
									alignItems='flex-start'
									spacing={4}
									marginBottom={4}
									width={200}
								>
									<Box
										component={Avatar}
										width={60}
										height={60}
										marginBottom={2}
										marginRight={{ md: 0, xs: 2 }}
										bgcolor={alpha(theme.palette.primary.main, 0.3)}
										color={theme.palette.primary.main}
										variant='rounded'
										borderRadius={2}
									>
										{item.icon}
									</Box>
								</Stack>

								<Stack
									direction='column'
									justifyContent='space-around'
									alignItems='center'
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
					flexDirection={{ xs: 'column', sm: 'row' }}
					alignItems={{ xs: 'stretched', sm: 'flex-start' }}
					justifyContent={'center'}
					marginTop={isMd ? 12 : 4}
				>
					<Button
						variant='contained'
						color='primary'
						size='large'
						fullWidth={!isMd}
						onClick={handlePushToDashboardViews}
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
						{`Proceed as ${alignment ? alignment.split('-').join(' ') : '...'}`}
					</Button>
				</Box>
			</Stack>
		</Container>
	);
};

export default SelectUserType;
