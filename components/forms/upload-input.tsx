import { ChangeEvent, Fragment } from 'react';

import { InputProps } from '@/components/forms/input-props';
import { uploadFiles } from '@/lib/uploadthing';
import { CloudUpload } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller } from 'react-hook-form';

const ValidationTextField = styled(TextField)({
	'& input:valid:focus + fieldset': {
		borderLeftWidth: '6px !important',
		borderWidth: 2,
		padding: '4px !important',
	},
	'& label.Mui-focused': {
		color: '#677788',
	},
});

export default function UploadInput({
	name,
	control,
	label,
	...rest
}: InputProps) {
	const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		console.log(
			'Class: default, Function: handleFileUpload, Line 29 file():',
			file
		);

		if (file) {
			console.log(
				'Class: default, Function: handleFileUpload, Line 35 file():',
				file
			);
			try {
				console.log(
					'Class: default, Function: handleFileUpload, Line 36 file():',
					file
				);
				// @ts-expect-error
				const [res] = await uploadFiles([file], 'imageUploader');
				console.log(
					'Class: default, Function: handleFileUpload, Line 33 res():',
					res
				);

				return {
					file: {
						url: res.fileUrl,
					},
					success: 1,
				};
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({
				field: { onChange, value },
				fieldState: { error },
				formState,
			}) => (
				<ValidationTextField
					helperText={error ? error.message : null}
					size='medium'
					error={!!error}
					onChange={onChange}
					value={value || ''}
					fullWidth
					label={label}
					variant='outlined'
					InputProps={{
						endAdornment: (
							<Fragment>
								<input
									accept='image/*'
									type='file'
									style={{ display: 'none' }}
									id='file-input'
									onChange={handleFileUpload}
								/>
								<label htmlFor='file-input'>
									<Button
										variant='contained'
										color='primary'
										component='span'
										startIcon={<CloudUpload />}
										sx={{
											marginLeft: 1,
										}}
									>
										Upload
									</Button>
								</label>
							</Fragment>
						),
					}}
					{...rest}
				/>
			)}
		/>
	);
}
