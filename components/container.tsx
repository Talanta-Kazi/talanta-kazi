import type { ReactNode } from 'react';

import { Box } from '@mui/material';

interface Props {
	children: ReactNode;

	// All other props
	[x: string]: any;
}

const Container = ({ children, ...rest }: Props): JSX.Element => (
	<Box
		maxWidth={{ sm: 720, md: 1310 }}
		width={1}
		margin={'0 auto'}
		paddingX={2}
		paddingY={{ xs: 4, sm: 6, md: 8 }}
		{...rest}
	>
		{children}
	</Box>
);

export default Container;
