import { useEffect, useState } from 'react';

import { FormLabel, Slider as MuiSLider } from '@mui/material';
import { Controller } from 'react-hook-form';

import { type InputProps } from './input-props';

function Slider({ name, control, setValue, label }: InputProps) {
	const [sliderValue, setSliderValue] = useState<number>(30);

	useEffect(() => {
		if (sliderValue) setValue(name, sliderValue);
	}, [sliderValue]);

	const handleChange = (event: any, newValue: number | number[]) => {
		setSliderValue(newValue as number);
	};

	return (
		<>
			<FormLabel component='legend'>{label}</FormLabel>
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState, formState }) => (
					<MuiSLider
						value={sliderValue}
						onChange={handleChange}
						valueLabelDisplay='auto'
						min={0}
						max={100}
						step={1}
					/>
				)}
			/>
		</>
	);
}

export default Slider;
