import { type CSSProperties } from 'react';

import { fontSans } from '@/lib/fonts';
import { type ThemeOptions } from '@mui/material/styles';

type Func = () => NonNullable<ThemeOptions['typography']>;

/**
 * Customized Material UI typography.
 *
 * @see https://mui.com/customization/typography/
 * @see https://mui.com/customization/default-theme/?expand-path=$.typography
 */
const createTypography: Func = () => ({
	a: {
		textDecoration: 'none',
	},
	body1: { fontFamily: fontSans.style.fontFamily },
	body2: { fontFamily: fontSans.style.fontFamily },

	button: {
		fontWeight: 'medium' as CSSProperties['fontWeight'],
		textTransform: 'none',
	},

	// fontSize: 16,
	color: '#191414',

	fontFamily: fontSans.style.fontFamily,
});

export { createTypography };
