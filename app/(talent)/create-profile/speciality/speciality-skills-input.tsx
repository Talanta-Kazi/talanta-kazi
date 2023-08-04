import { CheckBox, CheckBoxOutlineBlank, Clear } from '@mui/icons-material';
import {
	Autocomplete,
	Checkbox,
	Chip,
	Grid,
	IconButton,
	TextField,
} from '@mui/material';
import { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import { fancyId, removeDuplicates } from '@/lib/utils';

interface Props {
	id: number;
	control: any;
	label: string;
	allSpeciality: any;
	specialism: any;
	allSpecialtiesData: any;
	handleDelete: (id: number) => void;
}

const icon = <CheckBoxOutlineBlank fontSize='small' />;
const checkedIcon = <CheckBox fontSize='small' />;

export default function SpecialitySkillsInput({
	id,
	control,
	label,
	allSpeciality,
	specialism,
	allSpecialtiesData,
	handleDelete,
	...rest
}: Props) {
	return (
		<Fragment>
			<Grid item xs={11}>
				<Controller
					name='speciality'
					control={control}
					render={({ field: { onChange }, fieldState: { error } }) => (
						<Autocomplete
							{...rest}
							id='add-speciality'
							options={removeDuplicates(
								allSpeciality.map((item: { specialty: any }) => item.specialty),
							)}
							onChange={(_, data) => onChange(data)}
							renderInput={(params) => (
								<TextField
									{...params}
									name='speciality'
									size='medium'
									margin='dense'
									label={label}
									placeholder=''
									error={!!error}
									helperText={error ? error.message : null}
								/>
							)}
						/>
					)}
				/>

				<Controller
					name='specialitySkills'
					control={control}
					// onChange={([, data]) => data}
					render={({
						field: { onChange, value, ...props },
						fieldState: { error },
					}) => (
						<Autocomplete
							{...props}
							id='add-skills'
							multiple
							disabled={!specialism}
							// limitTags={3}
							disableCloseOnSelect
							options={allSpecialtiesData.map((item: any) => item)}
							// freeSolo
							onChange={(_, data) => onChange(data)}
							getOptionLabel={(option) => option}
							isOptionEqualToValue={(option, value) => option === value}
							// value={value || null}
							renderTags={(
								value: string[],
								getTagProps: (arg0: {
									index: number;
								}) => JSX.IntrinsicAttributes,
							) =>
								value.map((option: string, index: number) => (
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
									name='specialitySkills'
									size='medium'
									margin='dense'
									label='Skills'
									placeholder={!!value ? '+ Add more skills' : '+ Add a skill'}
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
					)}
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
