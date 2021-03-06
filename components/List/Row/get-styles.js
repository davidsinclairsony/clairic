import { StyleSheet } from 'react-native';
import { transparentize } from 'polished';
import { colors, spacing, bps, fontSizes, lineHeights } from 'lib/styling';

const buttonWidth = fontSizes.c * lineHeights.normal * 1.125;

export default ({ width }) =>
  StyleSheet.create({
    root: {
      display: 'grid',
      gridGap: spacing.e,
      gridTemplateColumns: `40px 1fr 1fr 1fr ${buttonWidth}px`,
      paddingHorizontal: spacing.e,
      boxSizing: 'border-box',
      alignItems: 'center',
      cursor: 'pointer',
      ...(width < bps.b
        ? {
            paddingHorizontal: spacing.d,
            gridTemplateColumns: `20px 1fr 1fr 1fr ${buttonWidth}px`,
          }
        : {}),
    },
    rootOdd: {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
    rootVideo: {
      gridTemplateColumns: `1fr 1fr ${buttonWidth}px`,
    },
    rootRecent: {
      gridTemplateColumns: `160px 1fr 1fr 1fr ${buttonWidth}px`,
    },
    rootPlaylists: {
      gridTemplateColumns: `1fr 90px 60px ${buttonWidth}px`,
      ...(width < bps.b
        ? {
            gridTemplateColumns: `1fr 80px 50px ${buttonWidth}px`,
          }
        : {}),
    },
    rootActive: {
      backgroundColor: `${transparentize(0.8, colors.a)}`,
    },
    column: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  });
