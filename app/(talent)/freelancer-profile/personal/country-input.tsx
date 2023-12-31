'use client';

import { useMemo } from 'react';

import { InputProps } from '@/components/forms/input-props';
import { Autocomplete, Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
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
			name={name}
			control={control}
			render={({ field: { onChange }, fieldState: { error } }) => (
				<Autocomplete
					id='country-select'
					onChange={(_, data) => onChange(data.label)}
					options={countries}
					defaultValue={countries.find(
						(country: { label: string | undefined }) =>
							country.label === defaultCountry
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
							label='Location'
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
