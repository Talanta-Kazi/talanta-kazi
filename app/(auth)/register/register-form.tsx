'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import type { MouseEvent } from 'react';
import { HTMLAttributes, useState } from 'react';

import { registerUserFn } from '@/app/(auth)/actions';
import Input from '@/components/forms/input';
import {
	RegisterInputSchema,
	registerAuthSchema,
} from '@/lib/validations/auth';
import useStore from '@/store/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	Button,
	Grid,
	InputAdornment,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

export default function RegisterForm({
	className,
	...props
}: UserAuthFormProps) {
	const { displaySnackMessage } = useStore();
	const [alignment, setAlignment] = useState('candidate');
	const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
	const [isConfirmPasswordVisible, setPasswordConfirmVisibility] =
		useState<boolean>(false);
	const toggleShowPassword = () =>
		setPasswordVisibility((prevState) => !prevState);
	const toggleShowConfirmPassword = () =>
		setPasswordConfirmVisibility((prevState) => !prevState);

	const { push, replace } = useRouter();
	const { data: authSession, status: authStatus } = useSession();

	const initialValues = {
		firstName: '',
		lastName: '',
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
		userType: '',
	};

	const form = useForm<RegisterInputSchema>({
		resolver: zodResolver(registerAuthSchema),
		defaultValues: initialValues,
		mode: 'onChange',
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting, isValid, isDirty },
	} = form;

	const handleFormTypeChange = (
		event: MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setAlignment(newAlignment);
	};

	const {
		mutate: registerUser,
		data,
		isSuccess,
	} = useMutation((userData: RegisterInputSchema) => registerUserFn(userData), {
		onMutate(variables) {},
		onSuccess(data) {
			displaySnackMessage({
				message:
					'Account registration successful. Kindly login to view your profile.',
			});
			push('/login');
		},
		onError(error: any) {
			if (Array.isArray((error as any).response.data.error)) {
				(error as any).response.data.error.forEach((el: any) =>
					displaySnackMessage({
						message: el.message,
						severity: 'error',
					})
				);
			} else {
				displaySnackMessage({
					message: (error as any).response.data.message,
					severity: 'error',
				});
			}
		},
	});

	const onSubmit: SubmitHandler<RegisterInputSchema> = (values) => {
		const payload = {
			...values,
			userType: alignment,
		};
		registerUser(payload);
	};

	return (
		<FormProvider {...form}>
			<Box marginTop={-12} paddingTop={12}>
				<Box marginBottom={4}>
					<Typography
						variant='h4'
						sx={{
							fontWeight: 700,
						}}
					>
						Create an account profile
					</Typography>
					<Typography color='text.secondary'>
						Your source for the information and resources you need for your
						career journey at Talanta Kazi. Create personalized job alerts, see
						jobs recommended for you, get interview schedules and more.
					</Typography>
				</Box>

				<ToggleButtonGroup
					fullWidth
					size='small'
					color='standard'
					value={alignment}
					exclusive
					onChange={handleFormTypeChange}
					aria-label='Work'
					sx={{ marginBottom: '28px' }}
				>
					<ToggleButton color='primary' value='talent'>
						Talent
					</ToggleButton>
					<ToggleButton color='primary' value='employer'>
						Employer
					</ToggleButton>
				</ToggleButtonGroup>

				<form method='post' onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={4}>
						{/*<Grid item xs={12}>*/}
						{/*	<FormInputText*/}
						{/*		select*/}
						{/*		autoFocus={false}*/}
						{/*		margin="dense"*/}
						{/*		name="userType"*/}
						{/*		placeholder="Professional or General Technical workers"*/}
						{/*		size="medium"*/}
						{/*		control={control}*/}
						{/*		label="Experience level"*/}
						{/*		type="text"*/}
						{/*	>*/}
						{/*		{accountType.map((item: string) => (*/}
						{/*			<MenuItem key={fancyId()} value={item}>*/}
						{/*				{item}*/}
						{/*			</MenuItem>*/}
						{/*		))}*/}
						{/*	</FormInputText>*/}
						{/*</Grid>*/}

						<Grid item xs={12} md={6}>
							<Input
								required
								name='firstName'
								control={control}
								label='First name'
								type='text'
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Input
								required
								name='lastName'
								control={control}
								label='Last name'
								type='text'
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Input
								required
								name='userName'
								control={control}
								label='Username'
								type='text'
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Input
								required
								name='email'
								control={control}
								label='Email'
								type='email'
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Input
								required
								name='password'
								type={isPasswordVisible ? 'text' : 'password'}
								control={control}
								label='Password'
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
						</Grid>
						<Grid item xs={12} md={6}>
							<Input
								required
								name='confirmPassword'
								type={isConfirmPasswordVisible ? 'text' : 'password'}
								control={control}
								label='Confirm password'
								InputProps={{
									endAdornment: (
										<InputAdornment
											sx={{ cursor: 'pointer' }}
											onClick={toggleShowConfirmPassword}
											position='end'
										>
											{isConfirmPasswordVisible ? (
												<Visibility />
											) : (
												<VisibilityOff />
											)}
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item container xs={12}>
							<Box
								display='flex'
								flexDirection={'column'}
								justifyContent='space-between'
								width={1}
								margin='0'
							>
								<LoadingButton
									fullWidth
									variant='contained'
									type='submit'
									color='primary'
									size='large'
									loading={isSubmitting}
									disabled={isSubmitting || !isDirty || !isValid}
									loadingIndicator='Please wait...'
								>
									Create Account Profile
								</LoadingButton>
							</Box>
							<Box marginTop={2}>
								<Typography variant='subtitle2'>
									Already have an account?{' '}
									<Button
										component={Link}
										href='/login'
										color='primary'
										sx={{ fontWeight: 700 }}
									>
										Login.
									</Button>
								</Typography>
							</Box>
							<Box marginTop={2}>
								<Typography
									variant='subtitle2'
									color='text.secondary'
									align='left'
								>
									By clicking &quot;Sign up&quot; button you agree with our
									<Button
										component={Link}
										href='/company-terms'
										variant='text'
										color='inherit'
										sx={{ fontWeight: 700 }}
									>
										terms and conditions.
									</Button>
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</form>
			</Box>
		</FormProvider>
	);
}
