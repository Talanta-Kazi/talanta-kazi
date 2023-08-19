import { InputProps } from '@/components/forms/input-props';
import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import { Controller } from 'react-hook-form';

export default function Checkbox({
	name,
	control,
	label,
	...rest
}: InputProps) {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={false}
			render={({
				field: { onChange, value, ...field },
				fieldState: { error },
			}) => (
				<FormControlLabel
					control={
						<MuiCheckbox checked={value} onChange={onChange} {...field} />
					}
					label={label}
					{...rest}
				/>
			)}
		/>
	);
}
