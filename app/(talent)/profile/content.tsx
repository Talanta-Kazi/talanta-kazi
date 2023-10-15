'use client';

/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';

import dayjsTime from '@/lib/dayjsTime';
import { fancyId } from '@/lib/utils';
import { Chip, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
	bio?: string;
	skills?: any;
	experience?: any;
}

const removeFalsy = <T, _>(arr: T[]): T[] => arr.filter(Boolean);

const ListItem = styled('li')(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

const Content = ({ bio, skills, experience }: Props): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});
	const [summaryMore, setSummaryMore] = useState(true);

	const modifiedExperience: any[] = [];
	experience.forEach((element: {}) => {
		if (Object.keys(element).length !== 0) {
			modifiedExperience.push(element);
		}
	});

	return (
		<Box component={Card} variant={'outlined'} padding={2}>
			<Box paddingX={{ sm: 2, xs: 0 }} paddingY={1}>
				<Typography variant={'h6'} gutterBottom>
					Summary
				</Typography>
				<Typography
					color={'text.secondary'}
					sx={
						summaryMore
							? {
									display: '-webkit-box',
									overflow: 'hidden',
									paddingY: 0,
									textOverflow: 'ellipsis',
									WebkitBoxOrient: 'vertical',
									WebkitLineClamp: { md: 2, xs: 3 },
							  }
							: {}
					}
				>
					{bio || 'No bio provided'}
				</Typography>
				<Typography
					variant='subtitle2'
					color={'primary.main'}
					sx={{ cursor: 'pointer' }}
					onClick={() => setSummaryMore((prev) => !prev)}
				>
					{summaryMore ? 'more' : 'less'}
				</Typography>
			</Box>
			<Box paddingY={4}>
				<Divider />
			</Box>

			<Box paddingX={{ sm: 2, xs: 0 }} paddingY={1}>
				<Typography variant={'h6'} gutterBottom>
					Skills
				</Typography>
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'start',
						listStyle: 'none',
						m: 0,
					}}
					component='ul'
				>
					{skills.map((skill: any) => (
						<ListItem key={fancyId()}>
							<Chip
								label={skill.speciality}
								sx={{
									backgroundColor: alpha('#117ec9', 0.1),
									color: '#117ec9',
								}}
							/>
						</ListItem>
					))}
				</Box>
			</Box>
			<Box paddingY={4}>
				<Divider />
			</Box>
			<Box paddingX={{ sm: 2, xs: 0 }}>
				<Typography variant={'h6'} gutterBottom>
					Experience
				</Typography>
				{modifiedExperience.map((item: any) => (
					<Box key={fancyId()}>
						<Stack
							direction='row'
							justifyContent='space-between'
							alignItems='flex-start'
							spacing={2}
						>
							<div>
								<Typography variant={'body1'} color={'text.secondary'}>
									{item.job_title}
								</Typography>
								<Typography variant={'body1'}>{item.company}</Typography>
							</div>
							<Typography
								variant={'body1'}
								color={'text.secondary'}
								sx={{
									marginBottom: 2,
								}}
							>
								{dayjsTime(item.from_date).format('YYYY')} -{' '}
								{dayjsTime(item.to_date).format('YYYY')}
							</Typography>
						</Stack>
						<Typography variant={'body1'} color={'text.secondary'}>
							{item.achievements}
						</Typography>
					</Box>
				))}

				{/*<Typography variant={'subtitle1'}>*/}
				{/*	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
				{/*	eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad*/}
				{/*	minim veniam, quis nostrud exercitation ullamco laboris nisi ut*/}
				{/*	aliquip ex ea commodo consequat. Duis aute irure dolor in*/}
				{/*	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla*/}
				{/*	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in*/}
				{/*	culpa qui officia deserunt mollit anim id est laborum.*/}
				{/*</Typography>*/}
				{/*<Box marginY={4}>*/}
				{/*	<Typography variant={'h5'} gutterBottom>*/}
				{/*		Big heading for a new topic*/}
				{/*	</Typography>*/}
				{/*	<Typography>*/}
				{/*		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
				{/*		eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim*/}
				{/*		ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut*/}
				{/*		aliquip ex ea commodo consequat. Duis aute irure dolor in*/}
				{/*		reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla*/}
				{/*		pariatur.*/}
				{/*	</Typography>*/}
				{/*	<Box marginTop={2}>*/}
				{/*		<ul>*/}
				{/*			<li>*/}
				{/*				<Typography>*/}
				{/*					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed*/}
				{/*					do eiusmod tempor incididunt ut labore et dolore magna aliqua.*/}
				{/*				</Typography>*/}
				{/*			</li>*/}
				{/*			<li>*/}
				{/*				<Typography>*/}
				{/*					Ut enim ad minim veniam, quis nostrud exercitation ullamco*/}
				{/*					laboris nisi ut aliquip ex ea commodo consequat.*/}
				{/*				</Typography>*/}
				{/*			</li>*/}
				{/*		</ul>*/}
				{/*	</Box>*/}
				{/*</Box>*/}
			</Box>
		</Box>
	);
};

export default Content;
