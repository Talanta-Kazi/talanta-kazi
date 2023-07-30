'use client';

import { InputProps } from '@/components/forms/input-props';
import { Autocomplete } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useMemo } from 'react';
// @ts-ignore
import countryList from 'react-select-country-list';

interface CountryInputProps extends InputProps {
	defaultCountry?: string;
}

export default function CountryInput({
	name,
	control,
	label,
	defaultCountry,
	...rest
}: CountryInputProps) {
	const countries = useMemo(() => countryList().getData(), []);
	return (
		<Controller
			name='country'
			control={control}
			render={({ field: { onChange }, fieldState: { error } }) => (
				<Autocomplete
					id='country-select'
					onChange={(_, data) => onChange(data.label)}
					options={countries}
					defaultValue={countries.find(
						(country: { label: string | undefined }) =>
							country.label === defaultCountry,
					)}
					autoHighlight
					getOptionLabel={(option) => option?.label}
					renderOption={(props, option) => (
						<Box component='li' {...props}>
							{option.label}
						</Box>
					)}
					renderInput={(params) => (
						<TextField
							{...params}
							label='Country'
							margin='dense'
							size='medium'
							error={!!error}
							helperText={error ? error.message : null}
						/>
					)}
				/>
			)}
		/>
	);
}
