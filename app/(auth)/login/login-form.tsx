'use client';

import { Form } from '@/components/forms/form';
import { Box, Button, Grid, InputAdornment, Typography } from '@mui/material';
import { authSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HTMLAttributes, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useStore from '@/store/index';
import { LoadingButton } from '@mui/lab';
import Link from '@/components/link';
import Input from '@/components/forms/input';

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

type FormData = z.infer<typeof authSchema>;

export function LoginForm({ className, ...props }: UserAuthFormProps) {
	const { displaySnackMessage } = useStore();
	const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
	const toggleShowPassword = () =>
		setPasswordVisibility((prevState) => !prevState);

	const { push, replace } = useRouter();
	const { data: authSession, status: authStatus } = useSession();

	const form = useForm<FormData>({
		resolver: zodResolver(authSchema),
		mode: 'onChange',
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting, isValid, isDirty },
	} = form;
	const searchParams = useSearchParams();

	async function onSubmit({ username, password }: FormData) {
		const res = await signIn('auth-login', {
			username,
			password,
			redirect: false,
			callbackUrl: '/',
		});

		if (res?.error) {
			displaySnackMessage({
				message: res?.error as string,
				severity: 'error',
			});
		} else {
			displaySnackMessage({
				message: 'You have successfully logged in',
			});
			if (res?.url) await push(res?.url);
			// await push(callbackUrl);
		}
	}

	return (
		<Form {...form}>
			<Box marginTop={-12} paddingTop={12}>
				<Box marginBottom={4}>
					<Typography
						variant='h4'
						sx={{
							fontWeight: 700,
						}}
					>
						Welcome back
					</Typography>
					<Typography color='text.secondary'>
						Login to manage your account.
					</Typography>
				</Box>
				<form name='login-form' onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<Input
								required
								name='username'
								size='medium'
								control={control}
								label='Username'
								type='text'
							/>
						</Grid>
						<Grid item xs={12}>
							<Input
								required
								name='password'
								type={isPasswordVisible ? 'text' : 'password'}
								size='medium'
								control={control}
								label='Password'
								placeholder='Password'
								InputProps={{
									endAdornment: (
										<InputAdornment
											sx={{ cursor: 'pointer' }}
											onClick={toggleShowPassword}
											position='end'
										>
											{isPasswordVisible ? <Visibility /> : <VisibilityOff />}
										</InputAdornment>
									),
								}}
							/>
							<Box
								display='flex'
								flexDirection={{ xs: 'column', sm: 'row' }}
								alignItems={{ xs: 'stretched', sm: 'center' }}
								justifyContent='flex-end'
								width={1}
								marginBottom={0}
							>
								<Button
									component={Link}
									href='/password-reset-cover'
									variant='text'
									color='inherit'
									sx={{ fontWeight: 700 }}
								>
									Forgot your password?
								</Button>
							</Box>
						</Grid>
						<Grid item container xs={12}>
							<Box
								display='flex'
								flexDirection={'column'}
								justifyContent='space-between'
								width={1}
								maxWidth={600}
								margin='0 auto'
							>
								<LoadingButton
									fullWidth
									variant='contained'
									type='submit'
									color='primary'
									size='large'
									loading={isSubmitting}
									loadingIndicator='Please wait...'
								>
									Login
								</LoadingButton>
								<Box marginTop={2}>
									<Typography variant='subtitle2'>
										Don&apos;t have an account yet?{' '}
										<Button
											component={Link}
											href='/register'
											variant='text'
											color='inherit'
											sx={{ fontWeight: 700 }}
										>
											Sign up here.
										</Button>
									</Typography>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Form>
	);
}
