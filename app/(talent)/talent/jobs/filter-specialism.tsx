'use client';

import { useState } from 'react';

import Input from '@/components/forms/input';
import { fancyId } from '@/lib/utils';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function FilterSpecialism({
	specialisms,
}: {
	specialisms: any;
}) {
	const [value, setValue] = useState([20, 400]);
	const [open, setOpen] = useState(true);

	const handleClick = (): void => {
		setOpen(!open);
	};

	const { handleSubmit, control, reset, formState } = useForm({
		mode: 'onChange',
	});

	const specialism = !specialisms
		? ['Loading']
		: specialisms?.map((item: any) => item.specialty);

	return (
		<Box>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				marginBottom={1}
				sx={{ cursor: 'pointer' }}
				onClick={() => handleClick()}
			>
				<Typography fontWeight={700}>Select specialism</Typography>
				{open ? <ExpandLess /> : <ExpandMore />}
			</Box>
			<Collapse in={open} timeout='auto' unmountOnExit>
				<Box>
					<Input
						required
						select
						name='Select specialism'
						margin='dense'
						placeholder='Select specialism'
						value='Select specialism'
						size='small'
						control={control}
						label='Select specialism'
						type='text'
						disabled={!specialisms}
						SelectProps={{
							native: true,
						}}
					>
						{specialism.map((option: any) => (
							<option key={fancyId()} value={option}>
								{option}
							</option>
						))}
					</Input>
				</Box>
			</Collapse>
		</Box>
	);
}
