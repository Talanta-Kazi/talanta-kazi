'use client';

import FacebookIcon from '@mui/icons-material/FacebookOutlined';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import { Stack } from '@mui/material';

export default function SocialLinks() {
	return (
		<Stack direction='row' alignItems='center' spacing={1}>
			<FacebookIcon />
			<LinkedinIcon />
		</Stack>
	);
}
