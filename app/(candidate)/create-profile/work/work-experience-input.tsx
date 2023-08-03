import { Clear } from '@mui/icons-material';
import {
	Checkbox,
	FormControlLabel,
	Grid,
	IconButton,
	Stack,
} from '@mui/material';
import type { Dayjs } from 'dayjs';
import { Fragment } from 'react';
import Input from '@/components/forms/input';
import Date from '@/components/forms/date';
import TextEditor from '@/components/forms/text-editor';

interface Props {
	id: number;
	control: any;
	label?: string;
	handleDelete: (id: number) => void;
	fromDate: Dayjs | null;
	toDate: Dayjs | null;
	setFromDate: any;
	setToDate: any;
	handleCurrentSchoolSelect: () => void;
	isCurrentWork: boolean;
}

export default function WorkExperienceInput({
	id,
	control,
	label,
	handleDelete,
	fromDate,
	toDate,
	setFromDate,
	setToDate,
	handleCurrentSchoolSelect,
	isCurrentWork,
	...rest
}: Props) {
	return (
		<Fragment>
			<Grid item xs={11} spacing={0}>
				<Input
					autoFocus
					required
					name='company'
					margin='dense'
					size='medium'
					control={control}
					label='Company'
					type='text'
				/>
				<Input
					required
					name='job_title'
					margin='dense'
					size='medium'
					control={control}
					label='Job Title'
					type='text'
				/>

				<TextEditor
					name='job_description'
					control={control}
					label='Job Description'
				/>

				<Input
					name='achievements'
					margin='dense'
					size='medium'
					control={control}
					label='Achievements'
					placeholder=''
					type='text'
					multiline
					rows={4}
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
						disabled={isCurrentWork}
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
					label='Current work'
				/>
			</Grid>
			<Grid item xs={1} spacing={0} sx={{ marginLeft: '0 !important' }}>
				{id > 0 ? (
					<IconButton aria-label='delete' onClick={() => handleDelete(id)}>
						<Clear color='error' />
					</IconButton>
				) : null}
			</Grid>
		</Fragment>
	);
}
