import { Box, Button, Divider, Skeleton, Typography } from '@mui/material';

export default function Loading() {
	return (
		<Box>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={{ xs: 'flex-start', sm: 'center' }}
				flexDirection={{ xs: 'column', sm: 'row' }}
			>
				<Box>
					<Typography fontWeight={700} variant={'h4'} gutterBottom>
						<Skeleton width={300} />
					</Typography>
					<Typography variant={'h6'}>
						<Skeleton width={210} />
					</Typography>
				</Box>
				<Box display='flex' marginTop={{ xs: 2, md: 0 }}>
					<Button variant='contained' color='primary' size='large'>
						Apply now
					</Button>
				</Box>
			</Box>
			<Divider sx={{ marginY: 4 }} />
		</Box>
	);
}
