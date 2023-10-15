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
						display: 'flex !important',
						height: '80%',
						width: '80%',
					},
				}}
			>
				<Box
					component={LazyLoadImage}
					height={1}
					width={1}
					borderRadius={2}
					src={'/img/home1.jpeg'}
					alt='...'
					effect='blur'
					sx={{
						filter: theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
						objectFit: 'cover',
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
					src={'/img/home2.jpeg'}
					alt='...'
					effect='blur'
					sx={{
						filter: theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
						objectFit: 'cover',
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
					src={'/img/home3.jpeg'}
					alt='...'
					effect='blur'
					sx={{
						filter: theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
						objectFit: 'cover',
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
						display: 'flex !important',
						height: '80%',
						width: '80%',
					},
				}}
			>
				<Box
					component={LazyLoadImage}
					height={1}
					width={1}
					borderRadius={2}
					src={'/img/home4.jpeg'}
					alt='...'
					effect='blur'
					sx={{
						filter: theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
						objectFit: 'cover',
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default Places;
