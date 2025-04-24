import { extendTheme } from 'native-base';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

// Extend the theme to include custom colors, fonts, etc.
export const theme = extendTheme({
  colors,
  fontConfig: typography.fontConfig,
  fonts: typography.fonts,
  fontSizes: typography.fontSizes,
  lineHeights: typography.lineHeights,
  space: spacing,
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'lg',
        _text: {
          fontWeight: 'bold',
        },
      },
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Input: {
      baseStyle: {
        borderRadius: 'lg',
        fontSize: 'md',
      },
    },
    Text: {
      baseStyle: {
        color: 'darkText',
      },
      defaultProps: {
        fontSize: 'md',
      },
    },
    Heading: {
      baseStyle: {
        color: 'darkText',
        fontWeight: 'bold',
      },
    },
  },
});

// Export theme types
export type CustomThemeType = typeof theme;
