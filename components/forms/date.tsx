import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';

import type { InputProps } from './input-props';
import dayjs from 'dayjs';

function Date({ name, control, label, ...rest }: InputProps) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Controller
				name={name}
				control={control}
				render={({
					field: { onChange, value },
					fieldState: { error },
					formState,
				}) => (
					<MobileDatePicker
						{...rest}
						label={label}
						value={dayjs(value)}
						onChange={onChange}
						sx={{ width: '100%' }}
					/>
				)}
			/>
		</LocalizationProvider>
	);
}

export default Date;
