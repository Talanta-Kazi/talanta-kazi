import { useState } from 'react';

import {
	Box,
	Button,
	FormControl,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onSidebarOpen: () => void;
	jobsCount: number;
}

export default function Topbar({ onSidebarOpen, jobsCount }: Props) {
	const theme = useTheme();
	const [sortBy, setSortBy] = useState(2);

	const handleSelectChange = (event: any) => {
		setSortBy(event.target.value);
	};

	return (
		<Box
			display={'flex'}
			flexDirection={{ sm: 'row', xs: 'column' }}
			alignItems={{ sm: 'center', xs: 'flex-start' }}
			justifyContent={'space-between'}
		>
			<Button
				onClick={onSidebarOpen}
				aria-label='Menu'
				variant={'outlined'}
				sx={{
					borderColor: theme.palette.divider,
					color: theme.palette.text.primary,
					display: { md: 'none', xs: 'flex' },
					marginRight: 2,
					minWidth: 'auto',
					paddingY: 1,
				}}
				startIcon={
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						width={20}
						height={20}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
						/>
					</svg>
				}
			>
				Filters
			</Button>
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'space-between'}
				width={1}
			>
				<Typography color={'text.primary'} marginRight={1}>
					{`${jobsCount} results found`}
				</Typography>
				<Box display={'flex'} alignItems={'center'} justifySelf={'flex-end'}>
					<Typography
						color={'text.primary'}
						marginRight={1}
						display={{ sm: 'block', xs: 'none' }}
					>
						Sort by
					</Typography>
					<FormControl sx={{ minWidth: 120 }}>
						<Select
							size={'small'}
							value={sortBy}
							onChange={handleSelectChange}
							sx={{
								'.MuiOutlinedInput-notchedOutline': {
									borderColor: theme.palette.divider,
								},
								'.MuiSelect-select.MuiSelect-outlined': {
									paddingY: '9px !important',
								},
							}}
						>
							<MenuItem value={1}>A-Z</MenuItem>
							<MenuItem value={2}>Z-A</MenuItem>
							<MenuItem value={4}>Best match</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Box>
		</Box>
	);
}
