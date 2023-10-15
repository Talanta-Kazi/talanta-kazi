import { type ReactNode } from 'react';

import { Box } from '@mui/material';

interface Props {
	children: ReactNode;

	// All other props
	[x: string]: any;
}

const Container = ({ children, ...rest }: Props): JSX.Element => (
	<Box
		maxWidth={{ md: 1310, sm: 720 }}
		width={1}
		margin={'0 auto'}
		paddingX={2}
		paddingY={{ md: 8, sm: 6, xs: 4 }}
		{...rest}
	>
		{children}
	</Box>
);

export default Container;
