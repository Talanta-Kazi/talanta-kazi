import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { SidebarNav } from './components';

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onClose: () => void;
	open: boolean;
	variant: 'permanent' | 'persistent' | 'temporary' | undefined;
	handleContactModal: () => void;
}

const Sidebar = ({
	open,
	variant,
	onClose,
	handleContactModal,
}: Props): JSX.Element => {
	return (
		<Drawer
			anchor='right'
			onClose={() => onClose()}
			open={open}
			variant={variant}
			transitionDuration={400}
			elevation={0}
			sx={{
				'& .MuiPaper-root': {
					width: '100%',
					maxWidth: { xs: '100%', sm: 400 },
				},
			}}
		>
			<Box
				sx={{
					height: '100%',
					padding: 1,
				}}
			>
				<SidebarNav handleContactModal={handleContactModal} onClose={onClose} />
			</Box>
		</Drawer>
	);
};

export default Sidebar;
