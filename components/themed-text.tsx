import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | 'default'
    | 'title'
    | 'display'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    | 'eyebrow'
    | 'caption';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'display' ? styles.display : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'eyebrow' ? styles.eyebrow : undefined,
        type === 'caption' ? styles.caption : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.body,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: Fonts.body,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 32,
    fontFamily: Fonts.display,
  },
  display: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 38,
    fontFamily: Fonts.display,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    fontFamily: Fonts.body,
  },
  eyebrow: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.label,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.body,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#D9694A',
    fontFamily: Fonts.body,
  },
});
