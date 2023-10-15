import { TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller } from 'react-hook-form';

import { type InputProps } from './input-props';

const ValidationTextField = styled(TextareaAutosize)({
	'& input:valid:focus + fieldset': {
		borderLeftWidth: '6px !important',
		borderWidth: 2,
		padding: '4px !important',
	},
	'& label.Mui-focused': {
		color: '#677788',
	},
});

function TextArea({ name, control, label, ...rest }: InputProps) {
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
					// helperText={error ? error.message : null}
					// size="small"
					// error={!!error}
					onChange={onChange}
					value={value || ''}
					{...rest}
				/>
			)}
		/>
	);
}

export default TextArea;
