import { type ReactNode } from 'react';

import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Typography,
	styled,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

interface ModalProps {
	isModalOpen: boolean;
	isRequesting?: boolean;
	loadingText?: string;
	renderHeader: ReactNode | string | null;
	renderContent?: ReactNode;
	renderDialogText?: ReactNode;
	fullScreen?: boolean;
	onClose: (e?: any) => void;
	submitButtonName?: string;
	disabled?: boolean;
	onSubmit?: (e?: any) => void;
	onDismiss?: (e?: any) => void;
	innerRef?: any;
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuDialogActions-root': {
		padding: theme.spacing(1),
	},
	'& .MuDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialog-paper': {
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: 12,
	},
}));

export interface DialogTitleProps {
	id: string;
	children?: ReactNode;
	onClose: () => void;
}

const BootstrapDialogTitle = ({
	children,
	onClose,
	...other
}: DialogTitleProps) => (
	<DialogTitle
		sx={{
			backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
			color: (theme) => theme.palette.primary.main,
			m: 0,
			p: 2,
			paddingX: 3,
		}}
		{...other}
	>
		<Typography variant='body1' fontWeight={500}>
			{children}
		</Typography>
		{onClose ? (
			<IconButton
				aria-label='close'
				onClick={onClose}
				sx={{
					color: (theme) => theme.palette.grey[500],
					p: 1,
					position: 'absolute',
					right: 8,
					top: 8,
				}}
			>
				<Close fontSize='small' />
			</IconButton>
		) : null}
	</DialogTitle>
);

const Modal = ({
	isModalOpen,
	renderContent,
	fullScreen,
	onClose,
	renderHeader,
	submitButtonName,
	onSubmit,
	onDismiss,
	disabled = false,
	renderDialogText = '',
	isRequesting,
	loadingText = 'Loading...',
	maxWidth = 'xs',
}: ModalProps): JSX.Element => {
	return (
		<BootstrapDialog
			onClose={onClose}
			aria-labelledby='modal-dialog-title'
			open={isModalOpen}
			fullScreen={fullScreen}
			maxWidth={maxWidth}
		>
			<BootstrapDialogTitle id='modal-dialog-title' onClose={onClose}>
				{renderHeader}
			</BootstrapDialogTitle>
			<DialogContent>
				<DialogContentText variant='body2' sx={{ paddingY: 2 }} gutterBottom>
					{renderDialogText}
				</DialogContentText>
				{renderContent}
			</DialogContent>
			<DialogActions>
				<Button variant='text' color='primary' onClick={onDismiss}>
					Dismiss
				</Button>
				{submitButtonName ? (
					<LoadingButton
						// autoFocus
						variant='contained'
						color='primary'
						onClick={onSubmit}
						disabled={disabled}
						loading={isRequesting}
						loadingIndicator={loadingText}
					>
						{submitButtonName}
					</LoadingButton>
				) : null}
			</DialogActions>
		</BootstrapDialog>
	);
};

export default Modal;
