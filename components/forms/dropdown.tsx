import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

import { type InputProps } from './input-props';

const options = [
	{
		label: 'Dropdown Option 1',
		value: '1',
	},
	{
		label: 'Dropdown Option 2',
		value: '2',
	},
];

function Dropdown({ name, control, label }: InputProps) {
	const generateSingleOptions = () =>
		options.map((option: any) => (
			<MenuItem key={option.value} value={option.value}>
				{option.label}
			</MenuItem>
		));

	return (
		<FormControl size='small'>
			<InputLabel>{label}</InputLabel>
			<Controller
				render={({ field: { onChange, value } }) => (
					<Select onChange={onChange} value={value}>
						{generateSingleOptions()}
					</Select>
				)}
				control={control}
				name={name}
			/>
		</FormControl>
	);
}

export default Dropdown;
