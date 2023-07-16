import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller } from 'react-hook-form';
import { InputProps } from '@/components/forms/input-props';

const ValidationTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: '#677788',
	},
	'& input:valid:focus + fieldset': {
		borderLeftWidth: '6px !important',
		borderWidth: 2,
		padding: '4px !important',
	},
});

function Input({ name, control, label, ...rest }: InputProps) {
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
					size='small'
					error={!!error}
					onChange={onChange}
					value={value || ''}
					fullWidth
					label={label}
					variant='outlined'
					{...rest}
				/>
			)}
		/>
	);
}

export default Input;
