import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import Link from 'next/link';
import ThemeToggler from '@/components/theme-toggler';

const Footer = (): JSX.Element => {
	const theme = useTheme();
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box
					display={'flex'}
					justifyContent={'space-between'}
					alignItems={'center'}
					width={1}
					flexDirection={{ xs: 'column' }}
				>
					<Box display='flex' flexWrap={'wrap'} alignItems={'center'}>
						<Box marginLeft={3}>
							<Link href='/' passHref>
								<Button
									sx={{ color: 'common.white' }}
									variant='text'
									size='small'
								>
									Candidates
								</Button>
							</Link>
						</Box>

						<Box marginLeft={3}>
							<Link href='/resources' passHref>
								<Button
									sx={{ color: 'common.white' }}
									variant='text'
									size='small'
								>
									Hiring
								</Button>
							</Link>
						</Box>

						<Box marginLeft={3}>
							<Link href='/store' passHref>
								<Button
									variant='text'
									size='small'
									sx={{ color: 'common.white' }}
								>
									Listing
								</Button>
							</Link>
						</Box>
						<Box marginLeft={3}>
							<ThemeToggler />
						</Box>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Typography align={'center'} variant={'subtitle2'} gutterBottom>
					&copy; talanta kazi {dayjs().format('YYYY')}. All rights reserved
				</Typography>
				<Typography align={'center'} variant={'caption'} component={'p'}>
					When you visit or interact with our sites, services or tools, we or
					our authorised service providers may use cookies for storing
					information to help provide you with a better, faster and safer
					experience and for marketing purposes.
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Footer;
