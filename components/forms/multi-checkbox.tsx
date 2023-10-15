import { useEffect, useState } from 'react';

import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';

import { type InputProps } from './input-props';

function MultiCheckbox({
	name,
	control,
	setValue,
	label,
	options,
	prefilledValues,
}: InputProps) {
	const [selectedItems, setSelectedItems] = useState<any>([]);

	const handleSelect = (value: any) => {
		const isPresent = selectedItems.indexOf(value);
		if (isPresent !== -1) {
			const remaining = selectedItems.filter((item: any) => item !== value);
			setSelectedItems(remaining);
		} else {
			setSelectedItems((prevItems: any) => [...prevItems, value]);
		}
	};

	useEffect(() => {
		if (prefilledValues) {
			setSelectedItems(() => [...prefilledValues]);
		}
	}, [prefilledValues]);

	useEffect(() => {
		setValue({ name, selectedItems });
	}, [selectedItems]);

	return (
		<FormControl size='small' variant='outlined'>
			<FormLabel component='legend'>{label}</FormLabel>

			<div>
				{options?.map((option: any) => (
					<FormControlLabel
						control={
							<Controller
								name={name}
								control={control}
								render={({}) => (
									<Checkbox
										checked={selectedItems?.includes(option.value)}
										onChange={() => handleSelect(option.value)}
									/>
								)}
							/>
						}
						label={option.label}
						key={option.value}
					/>
				))}
			</div>
		</FormControl>
	);
}

export default MultiCheckbox;
