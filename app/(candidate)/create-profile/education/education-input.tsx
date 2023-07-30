'use client';

import { CheckBox, CheckBoxOutlineBlank, Clear } from '@mui/icons-material';
import {
	Checkbox,
	FormControlLabel,
	Grid,
	IconButton,
	MenuItem,
	Stack,
} from '@mui/material';
import type { Dayjs } from 'dayjs';
import { Fragment } from 'react';
import Input from '@/components/forms/input';
import { fancyId } from '@/lib/utils';
import Date from '@/components/forms/date';

interface Props {
	id: number;
	control: any;
	label?: string;
	educationLevel: Array<string>;
	handleDelete: (id: number) => void;
	fromDate: Dayjs | null;
	toDate: Dayjs | null;
	setFromDate: any;
	setToDate: any;
	handleCurrentSchoolSelect: () => void;
	isCurrentSchool: boolean;
}

const icon = <CheckBoxOutlineBlank fontSize='small' />;
const checkedIcon = <CheckBox fontSize='small' />;

export default function EducationInput({
	id,
	control,
	label,
	educationLevel,
	handleDelete,
	fromDate,
	toDate,
	setFromDate,
	setToDate,
	handleCurrentSchoolSelect,
	isCurrentSchool,
	...rest
}: Props) {
	return (
		<Fragment>
			<Grid item xs={11}>
				<Input
					required
					name='institution'
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
					name='education_level'
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
					name='course'
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
						name='from_date'
						disableFuture
						control={control}
						label='From date'
						openTo='year'
						views={['year', 'month', 'day']}
						format='LL'
					/>

					<Date
						disabled={isCurrentSchool}
						disableFuture
						name='to_date'
						control={control}
						label='To date'
						openTo='year'
						views={['year', 'month', 'day']}
						format='LL'
					/>
				</Stack>

				<FormControlLabel
					control={<Checkbox onChange={() => handleCurrentSchoolSelect()} />}
					label='Current school'
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
