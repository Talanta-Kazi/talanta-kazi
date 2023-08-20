'use client';

import { usePathname } from 'next/navigation';

import { Fragment } from 'react';

import * as z from 'zod';
import { counties, siteLocation } from '@/app/(talent)/_components/fixtures';
import Conditional from '@/components/conditional';
import Input from '@/components/forms/input';
import ProfileBottomNavigation from '@/components/profile-bottom-navigation';
import useUpdateProfile from '@/lib/hooks/use-update-profile';
import { UploadButton } from '@/lib/uploadthing';
import { fancyId } from '@/lib/utils';
import useStore from '@/store';
import { Candidate } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import {
	Autocomplete,
	Avatar,
	Checkbox,
	Chip,
	Grid,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Theme, alpha, useTheme } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name: string, countyName: readonly string[], theme: Theme) {
	return {
		fontWeight:
			countyName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

const icon = <CheckBoxOutlineBlank fontSize='small' />;
const checkedIcon = <CheckBox fontSize='small' />;

interface CandidateTitleFormProps {
	candidate: Candidate;
}

const personalSchema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	job_title: z.string(),
	location: z.string().optional(),
	portfolio_link: z.string().optional(),
	other_portfolio_link: z.string().optional(),
	linkedin: z.string().optional(),
	twitter: z.string().optional(),
	whatsapp: z.string().optional(),
	profile_pic: z.string().optional(),
	counties: z.array(z.string()).optional(),
	email: z.string().email(),
});

export type CreateProfileTitleInputSchema = z.infer<typeof personalSchema>;

export default function PersonalForm({ candidate }: CandidateTitleFormProps) {
	const theme = useTheme();
	const personal = candidate?.personal ? JSON.parse(candidate.personal) : {};
	const { displaySnackMessage } = useStore();
	const pathname = usePathname();
	const navigationPath = pathname.split('/')[1];

	const { handleSubmit, control, setValue, watch } =
		useForm<CreateProfileTitleInputSchema>({
			mode: 'onChange',
			resolver: zodResolver(personalSchema),
			defaultValues: {
				first_name: candidate?.user?.first_name || '',
				last_name: candidate?.user?.last_name || '',
				job_title: candidate?.job_title || '',
				email: candidate?.user?.email || '',
				location: personal?.location || '',
				portfolio_link: personal?.portfolio_link || '',
				other_portfolio_link: personal?.other_portfolio_link || '',
				linkedin: personal?.linkedin || '',
				twitter: personal?.twitter || '',
				whatsapp: personal?.whatsapp || 'https://wa.me/',
				profile_pic: personal?.profile_pic || '/img/avatar_male.svg',
				counties: personal?.counties || [],
			},
		});

	const location = watch('location');
	const countyName = (watch('counties') as string[]) || [''];

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit = async (values: any) => {
		const customPersonal = {
			location: values.location,
			portfolio_link: values.portfolio_link,
			other_portfolio_link: values.other_portfolio_link,
			linkedin: values.linkedin,
			twitter: values.twitter,
			whatsapp: values.whatsapp,
		};
		const payload = {
			user: {
				first_name: values.first_name,
				last_name: values.last_name,
				email: values.email,
			},
			profile_pic: values.profile_pic,
			job_title: values.job_title,
			personal: JSON.stringify(customPersonal),
		};
		updateProfile(payload);
	};

	return (
		<form name='profile-title' method='post' onSubmit={handleSubmit(onSubmit)}>
			<Grid container marginTop={2} marginBottom={8}>
				<Typography
					variant='body1'
					marginBottom={2}
					color='primary'
					sx={{
						fontWeight: 600,
					}}
				>
					Basic information
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Input
							required
							name='first_name'
							control={control}
							label='First name'
							type='text'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Input
							required
							name='last_name'
							control={control}
							label='Last name'
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
							name='job_title'
							margin='dense'
							size='medium'
							control={control}
							label='Title'
							placeholder='Example: Customer service executive'
							type='text'
						/>
					</Grid>

					<Grid item xs={12} md={12} marginTop={2}>
						<Typography
							variant='body1'
							marginBottom={2}
							color='primary'
							sx={{
								fontWeight: 600,
							}}
						>
							Profile image
						</Typography>
						<Stack
							direction='row'
							justifyContent='flex-start'
							alignItems='flex-start'
							spacing={4}
						>
							<Controller
								name='profile_pic'
								control={control}
								render={({
									field: { onChange, value },
									fieldState: { error },
								}) => (
									<Fragment>
										<Avatar
											alt='...'
											src={value}
											aria-describedby='menu-popover'
											aria-controls='menu-popover'
											aria-haspopup='true'
											sx={{
												width: 56,
												height: 56,
											}}
										/>
										<UploadButton
											endpoint='imageUploader'
											onClientUploadComplete={(res: any) => {
												setValue('profile_pic', res[0]?.url as string);
												displaySnackMessage({
													message: 'Upload Completed',
												});
											}}
											onUploadError={(error: Error) => {
												displaySnackMessage({
													message: 'Something went wrong. Try once more.',
													severity: 'error',
												});
											}}
											className='uploadthing-class'
											content={{
												button({ ready, isUploading }) {
													if (ready) return <div>Upload image</div>;
													if (isUploading) return <div>Uploading image...</div>;
													return 'Getting ready...';
												},
												allowedContent({ ready, fileTypes, isUploading }) {
													if (!ready) return 'Checking what you allow';
													if (isUploading)
														return 'Uploading image, please wait...';
													return 'Image (jpg, png) 4MB max';
												},
											}}
										/>
									</Fragment>
								)}
							/>
						</Stack>
					</Grid>
				</Grid>

				<Grid container item xs={12} md={12} marginTop={4} spacing={2}>
					<Grid item xs={12} md={12}>
						<Typography
							variant='body1'
							marginBottom={2}
							color='primary'
							sx={{
								fontWeight: 600,
							}}
						>
							Location of work
						</Typography>
					</Grid>
					<Grid item xs={12} md={6}>
						<Input
							required
							select
							autoFocus={false}
							margin='dense'
							name='location'
							placeholder=''
							size='medium'
							control={control}
							label='Location'
							type='text'
						>
							{siteLocation.map((item: string) => (
								<MenuItem key={fancyId()} value={item}>
									{item}
								</MenuItem>
							))}
						</Input>
					</Grid>
					<Conditional condition={location === 'Kenya (On Site)'}>
						<Grid item xs={12} md={6}>
							<Controller
								name='counties'
								control={control}
								render={({
									field: { onChange, value, ...props },
									fieldState: { error },
								}) => (
									<Autocomplete
										{...props}
										id='add-counties'
										multiple
										// limitTags={3}
										disableCloseOnSelect
										options={counties?.sort().map((item: any) => item)}
										// freeSolo
										onChange={(_, data) => onChange(data)}
										getOptionLabel={(option) => option}
										isOptionEqualToValue={(option, value) => option === value}
										value={value}
										renderTags={(
											value: string[],
											getTagProps: (arg0: {
												index: number;
											}) => JSX.IntrinsicAttributes
										) =>
											value?.map((option: string, index: number) => (
												<Chip
													key={fancyId()}
													label={option}
													sx={{
														backgroundColor: alpha('#117ec9', 0.1),
														color: '#117ec9',
													}}
													{...getTagProps({ index })}
												/>
											))
										}
										renderOption={(props, option, { selected }) => (
											<li {...props} key={fancyId()}>
												<Checkbox
													icon={icon}
													checkedIcon={checkedIcon}
													style={{ marginRight: 8 }}
													checked={selected}
												/>
												{option}
											</li>
										)}
										renderInput={(params) => (
											<TextField
												{...params}
												name='counties'
												size='medium'
												margin='dense'
												label='Counties'
												placeholder={
													!!value
														? '+ Add more counties'
														: '+ Add a county location'
												}
												error={!!error}
												helperText={error ? error.message : null}
												inputProps={{
													...params.inputProps,
													onKeyDown: (e) => {
														if (e.key === 'Enter' && error) {
															e.stopPropagation();
														}
													},
												}}
											/>
										)}
									/>
								)}
							/>
						</Grid>
					</Conditional>
					{/*<CountryInput*/}
					{/*	name='location'*/}
					{/*	control={control}*/}
					{/*	label='location'*/}
					{/*	defaultCountry={personal?.location}*/}
					{/*/>*/}
				</Grid>

				<Grid item xs={12} marginTop={2}>
					<Typography
						variant='body1'
						marginBottom={2}
						color='primary'
						sx={{
							fontWeight: 600,
						}}
					>
						Social links
					</Typography>
					<Input
						name='linkedin'
						margin='dense'
						size='medium'
						control={control}
						label='LinkedIn'
						placeholder='https://linkedin.com/in/username'
						type='text'
					/>
					<Input
						name='twitter'
						margin='dense'
						size='medium'
						control={control}
						label='Twitter'
						placeholder='https://twitter.com/username'
						type='text'
					/>
					<Input
						name='whatsapp'
						margin='dense'
						size='medium'
						control={control}
						label='WhatsApp number'
						placeholder='https://wa.me/whatsapp-number'
						type='text'
					/>
					<Input
						name='portfolio_link'
						margin='dense'
						size='medium'
						control={control}
						label='Portfolio link'
						placeholder='https://portfolio.com'
						type='text'
					/>
					<Input
						name='other_portfolio_link'
						margin='dense'
						size='medium'
						control={control}
						label='Other portfolio link'
						placeholder='https://other-portfolio.com'
						type='text'
					/>
				</Grid>
			</Grid>
			<ProfileBottomNavigation
				isSuccess={isSuccess}
				loading={loading}
				nextPageUrl={`/${navigationPath}/speciality`}
				nextPageTitle='Share your skills'
			/>
		</form>
	);
}
