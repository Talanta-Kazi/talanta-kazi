import { Fragment } from 'react';

import { fancyId, removeDuplicates } from '@/lib/utils';
import { CheckBox, CheckBoxOutlineBlank, Clear } from '@mui/icons-material';
import {
	Autocomplete,
	Checkbox,
	Chip,
	Grid,
	IconButton,
	TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';

interface Props {
	id: number;
	control: any;
	watch: any;
	label: string;
	allSpeciality: any;
	handleDelete: (id: number) => void;
}

const icon = <CheckBoxOutlineBlank fontSize='small' />;
const checkedIcon = <CheckBox fontSize='small' />;

export default function SpecialitySkillsInput({
	id,
	control,
	watch,
	label,
	allSpeciality,
	handleDelete,
	...rest
}: Props) {
	const speciality = watch(`skills[${id}].speciality`);
	const specificSpeciality = allSpeciality?.filter(
		(item: { specialty: any }) => item.specialty === speciality
	);

	return (
		<Fragment>
			<Grid item xs={11}>
				<Controller
					name={`skills[${id}].speciality`}
					control={control}
					render={({ field: { onChange, value }, fieldState: { error } }) => {
						return (
							<Autocomplete
								{...rest}
								id='add-speciality'
								value={value}
								options={removeDuplicates(
									allSpeciality.map(
										(item: { specialty: any }) => item.specialty
									)
								)}
								onChange={(_, data) => onChange(data)}
								renderInput={(params) => (
									<TextField
										{...params}
										name='speciality'
										value={value || ''}
										size='medium'
										margin='dense'
										label={label}
										placeholder=''
										error={!!error}
										helperText={error ? error.message : null}
									/>
								)}
							/>
						);
					}}
				/>

				<Controller
					name={`skills[${id}].specialitySkills`}
					control={control}
					// onChange={([, data]) => data}
					render={({
						field: { onChange, value, ...props },
						fieldState: { error },
					}) => {
						return (
							<Autocomplete
								{...props}
								id='add-skills'
								multiple
								disabled={!speciality}
								// limitTags={3}
								disableCloseOnSelect
								options={(specificSpeciality[0]?.specific_specialty ?? [])?.map(
									(item: any) => item
								)}
								// freeSolo
								onChange={(_, data) => onChange(data)}
								getOptionLabel={(option) => option}
								isOptionEqualToValue={(option, value) => option === value}
								value={value}
								renderTags={(
									value: string[],
									getTagProps: (arg0: {
										index: number;
									}) => JSX.IntrinsicAttributes
								) =>
									value?.map((option: string, index: number) => (
										<Chip
											key={fancyId()}
											color='primary'
											label={option}
											{...getTagProps({ index })}
										/>
									))
								}
								renderOption={(props, option, { selected }) => (
									<li {...props} key={fancyId()}>
										<Checkbox
											icon={icon}
											checkedIcon={checkedIcon}
											style={{ marginRight: 8 }}
											checked={selected}
										/>
										{option}
									</li>
								)}
								renderInput={(params) => (
									<TextField
										{...params}
										name={`skills[${id}].specialitySkills`}
										size='medium'
										margin='dense'
										label='Skills'
										placeholder={
											!!value ? '+ Add more skills' : '+ Add a skill'
										}
										error={!!error}
										helperText={error ? error.message : null}
										inputProps={{
											...params.inputProps,
											onKeyDown: (e) => {
												if (e.key === 'Enter' && error) {
													e.stopPropagation();
												}
											},
										}}
									/>
								)}
							/>
						);
					}}
				/>
			</Grid>
			<Grid item xs={1}>
				{id > 0 ? (
					<IconButton aria-label='delete' onClick={() => handleDelete(id)}>
						<Clear color='error' />
					</IconButton>
				) : null}
			</Grid>
		</Fragment>
	);
}
