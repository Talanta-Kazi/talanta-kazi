import type { ThemeOptions } from '@mui/material/styles';
import type { CSSProperties } from 'react';
import { fontSans } from '@/lib/fonts';

type Func = () => NonNullable<ThemeOptions['typography']>;

/**
 * Customized Material UI typography.
 *
 * @see https://mui.com/customization/typography/
 * @see https://mui.com/customization/default-theme/?expand-path=$.typography
 */
const createTypography: Func = () => ({
	fontFamily: fontSans.style.fontFamily,
	// fontSize: 16,
	color: '#191414',
	button: {
		textTransform: 'none',
		fontWeight: 'medium' as CSSProperties['fontWeight'],
	},
	a: {
		textDecoration: 'none',
	},
});

export { createTypography };
