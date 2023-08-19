import { Fragment } from 'react';

import Input from '@/components/forms/input';
import { Clear } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';

interface Props {
	id: number;
	control: any;
	label?: string;
	handleDelete: (id: number) => void;
	handlePortfolioImagesUploadChange: (url: string) => void;
	handlePortfolioVideosUploadChange: (url: string) => void;
	handlePortfolioDocumentsUploadChange: (url: string) => void;
}

export default function PortfolioInput({
	id,
	control,
	handleDelete,
	handlePortfolioVideosUploadChange,
	handlePortfolioImagesUploadChange,
	handlePortfolioDocumentsUploadChange,
	...rest
}: Props) {
	return (
		<Fragment>
			<Grid item xs={11}>
				<Input
					name='project_title'
					margin='dense'
					size='medium'
					control={control}
					label='Project title'
					type='text'
				/>
				<Input
					name='project_description'
					margin='dense'
					size='medium'
					control={control}
					label='Project description'
					placeholder=''
					type='text'
					multiline
					rows={4}
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
