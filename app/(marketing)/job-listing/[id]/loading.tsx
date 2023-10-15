import { Box, Button, Divider, Skeleton, Typography } from '@mui/material';

export default function Loading() {
	return (
		<Box>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={{ sm: 'center', xs: 'flex-start' }}
				flexDirection={{ sm: 'row', xs: 'column' }}
			>
				<Box>
					<Typography fontWeight={700} variant={'h4'} gutterBottom>
						<Skeleton width={300} />
					</Typography>
					<Typography variant={'h6'}>
						<Skeleton width={210} />
					</Typography>
				</Box>
				<Box display='flex' marginTop={{ md: 0, xs: 2 }}>
					<Button variant='contained' color='primary' size='large'>
						Apply now
					</Button>
				</Box>
			</Box>
			<Divider sx={{ marginY: 4 }} />
		</Box>
	);
}
