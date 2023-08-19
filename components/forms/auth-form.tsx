'use client';

import { HTMLAttributes, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { signIn } from 'next-auth/react';

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

export default function AuthForm({ className, ...props }: UserAuthFormProps) {
	const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

	const handleGoogleLogin = async () => {
		setIsGoogleLoading(true);
		await signIn('google');
		setIsGoogleLoading(false);
	};

	return (
		<Grid container spacing={4}>
			<Grid item xs={12}>
				<LoadingButton
					size='large'
					variant='outlined'
					fullWidth
					// startIcon={buttonIcon['google']}
					onClick={handleGoogleLogin}
					loading={isGoogleLoading}
					loadingPosition='start'
				>
					Sign in with Google
				</LoadingButton>
			</Grid>
		</Grid>
	);
}
