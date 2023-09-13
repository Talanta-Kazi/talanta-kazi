import { getCandidateProfile } from '@/app/(talent)/actions';
import Content from '@/app/(talent)/profile/content';
import Sidebar from '@/app/(talent)/profile/sidebar';
import SocialLinks from '@/app/(talent)/profile/social-links';
import Container from '@/components/container';
import { Avatar, Box, Grid, Stack, Typography } from '@mui/material';

export default async function CandidateProfile() {
	const user = await getCandidateProfile();
	const education = JSON.parse(user?.education as string);
	const skills = JSON.parse(user?.skills as string);
	const experience = JSON.parse(user?.experience as string);

	return (
		<>
			<Box sx={{ overflowX: 'hidden' }} bgcolor='alternate.main'>
				<Box paddingY={0}>
					<Container paddingY={6}>
						<Stack
							spacing={2}
							direction='row'
							alignItems='flex-start'
							justifyContent='space-between'
						>
							<Stack spacing={2} direction='row' alignItems='center'>
								<Avatar
									alt='...'
									src={user.profile_pic}
									aria-describedby='menu-popover'
									aria-controls='menu-popover'
									aria-haspopup='true'
									typeof='button'
									// sizes={isSm ? "large" : "medium"}
								/>
								<div>
									<Typography variant='h5' fontWeight={600}>
										{`${user?.user.first_name} ${user?.user.last_name}`}
									</Typography>
									<Typography variant='body1'>{user.job_title}</Typography>
								</div>
							</Stack>
							<SocialLinks />
						</Stack>
					</Container>
				</Box>
			</Box>
			<Container bgcolor='background.default'>
				<Grid container spacing={2}>
					<Grid item xs={12} md={3}>
						<Box marginBottom={4}>
							<Sidebar education={education} />
						</Box>
					</Grid>
					<Grid item xs={12} md={9}>
						<Content
							bio={user.personal_statement}
							skills={skills.skills}
							experience={experience}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
