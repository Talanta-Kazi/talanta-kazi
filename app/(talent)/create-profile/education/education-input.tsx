import { CheckBox, CheckBoxOutlineBlank, Clear } from '@mui/icons-material';
import { Grid, IconButton, MenuItem, Stack } from '@mui/material';
import { Fragment } from 'react';
import Input from '@/components/forms/input';
import { fancyId } from '@/lib/utils';
import Date from '@/components/forms/date';
import Checkbox from '@/components/forms/checkbox';

interface Props {
	id: number;
	control: any;
	watch: any;
	label?: string;
	educationLevel: Array<string>;
	handleDelete: (id: number) => void;
}

const icon = <CheckBoxOutlineBlank fontSize='small' />;
const checkedIcon = <CheckBox fontSize='small' />;

export default function EducationInput({
	id,
	control,
	watch,
	label,
	educationLevel,
	handleDelete,
	...rest
}: Props) {
	return (
		<Fragment>
			<Grid item xs={11}>
				<Input
					required
					name={`education[${id}].institution`}
					margin='dense'
					size='medium'
					control={control}
					label='Institution name'
					type='text'
				/>
				<Input
					required
					select
					autoFocus={false}
					margin='dense'
					name={`education[${id}].education_level`}
					placeholder=''
					size='medium'
					control={control}
					label='Education level'
					type='text'
				>
					{educationLevel.map((item: string) => (
						<MenuItem key={fancyId()} value={item}>
							{item}
						</MenuItem>
					))}
				</Input>
				<Input
					required
					name={`education[${id}].course`}
					margin='dense'
					size='medium'
					control={control}
					label='Course'
					type='text'
				/>
				<Stack
					marginTop={2}
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					spacing={2}
				>
					<Date
						required
						name={`education[${id}].from_date`}
						type='date'
						disableFuture
						control={control}
						label='From date'
						openTo='year'
						views={['year', 'month', 'day']}
						format='LL'
					/>

					<Date
						disabled={watch(`education[${id}].current_school`) === true}
						type='date'
						disableFuture
						name={`education[${id}].to_date`}
						control={control}
						label='To date'
						openTo='year'
						views={['year', 'month', 'day']}
						format='LL'
					/>
				</Stack>

				<Checkbox
					label='Current school'
					control={control}
					name={`education[${id}].current_school`}
				/>

				{/*<FormControlLabel*/}
				{/*	control={<Checkbox onChange={() => handleCurrentSchoolSelect()} />}*/}
				{/*	label='Current school'*/}
				{/*/>*/}
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
