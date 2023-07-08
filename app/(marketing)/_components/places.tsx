import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Places = (): JSX.Element => {
	const theme = useTheme();

	return (
		<Grid container spacing={2} sx={{ display: 'flex' }}>
			<Grid
				item
				container
				justifyContent={'flex-end'}
				alignItems={'flex-end'}
				xs={4}
				sx={{
					'& .lazy-load-image-loaded': {
						width: '80%',
						height: '80%',
						display: 'flex !important',
					},
				}}
			>
				<Box
					component={LazyLoadImage}
					height={1}
					width={1}
					borderRadius={2}
					src={'/img/hydroponics-1.webp'}
					alt='...'
					effect='blur'
					sx={{
						objectFit: 'cover',
						filter: theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
					}}
				/>
			</Grid>
			<Grid
				item
				container
				justifyContent={'flex-start'}
				alignItems={'flex-end'}
				xs={8}
				sx={{
					'& .lazy-load-image-loaded': {
						display: 'flex !important',
						width: 1,
					},
				}}
			>
				<Box
					component={LazyLoadImage}
					height={1}
					width={1}
					borderRadius={2}
					src={'/img/hydroponics.webp'}
					alt='...'
					effect='blur'
					sx={{
						objectFit: 'cover',
						filter: theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
					}}
				/>
			</Grid>
			<Grid
				item
				container
				justifyContent={'flex-end'}
				alignItems={'flex-start'}
				xs={8}
				sx={{
					'& .lazy-load-image-loaded': {
						display: 'flex !important',
						width: 1,
					},
				}}
			>
				<Box
					component={LazyLoadImage}
					height={1}
					width={1}
					borderRadius={2}
					src={'/img/tomato-bucket.webp'}
					alt='...'
					effect='blur'
					sx={{
						objectFit: 'cover',
						filter: theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
					}}
				/>
			</Grid>
			<Grid
				item
				container
				justifyContent={'flex-start'}
				alignItems={'flex-start'}
				xs={4}
				sx={{
					'& .lazy-load-image-loaded': {
						width: '80%',
						height: '80%',
						display: 'flex !important',
					},
				}}
			>
				<Box
					component={LazyLoadImage}
					height={1}
					width={1}
					borderRadius={2}
					src={'/img/hydroponics-2.webp'}
					alt='...'
					effect='blur'
					sx={{
						objectFit: 'cover',
						filter: theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default Places;
