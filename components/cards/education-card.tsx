import dayjsTime from '@/lib/dayjsTime';
// import stripHtml from "@/utils/stripHtml";
import { Edit } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	Grid,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

export interface IEducation {
	course: string;
	institution: string;
	education_level: string;
	from_date: string;
	to_date: string;
}

interface WorkExperienceProps {
	education: IEducation;
}

function EducationCard({
	education: { course, education_level, institution, from_date, to_date },
}: WorkExperienceProps): JSX.Element {
	const theme = useTheme();

	return (
		<Grid item xs={12} sx={{ padding: '0 !important' }}>
			<Box
				component={Card}
				padding={0}
				width={1}
				height={1}
				borderRadius={0}
				// borderBottom={1}
				boxShadow={0}
				display='flex'
				flexDirection={{ md: 'row', xs: 'column' }}
				sx={{
					backgroundImage: 'none',
					bgcolor: 'transparent',
					borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
					paddingY: 2,
				}}
			>
				<CardContent
					sx={{
						// width: { xs: 1, md: "80%" },
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						padding: 0,
					}}
				>
					<Stack
						direction='row'
						justifyContent='space-between'
						alignItems='center'
						spacing={2}
						width={1}
					>
						<Typography variant='h6' fontWeight={600}>
							{course} | {institution}
						</Typography>
						<Box>
							<Tooltip title='Edit'>
								<IconButton aria-label='edit job'>
									<Edit />
								</IconButton>
							</Tooltip>
						</Box>
					</Stack>
					<Box marginY={1}>
						<Typography variant='body1'>
							{dayjsTime(from_date).format('MMMM DD YYYY ')} -{' '}
							{dayjsTime(to_date).format('MMMM DD YYYY ')}
						</Typography>
					</Box>
					<Typography color='text.secondary'>{education_level}</Typography>
				</CardContent>
			</Box>
		</Grid>
	);
}

export default EducationCard;
