/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#D9694A';
const tintColorDark = '#E07C5B';

export const Colors = {
  light: {
    text: '#1C1B18',
    muted: '#5B554B',
    background: '#F4F1EA',
    surface: '#FFFFFF',
    surfaceAlt: '#EFE6D8',
    border: '#E0D3BF',
    tint: tintColorLight,
    icon: '#5C5A55',
    tabIconDefault: '#7A746B',
    tabIconSelected: tintColorLight,
    calm: '#2E7CA3',
    warning: '#E58A2B',
    danger: '#C2383A',
    success: '#2F8C6D',
    highlight: '#F9D8A7',
  },
  dark: {
    text: '#F5F2EA',
    muted: '#B8B1A6',
    background: '#121513',
    surface: '#1B211E',
    surfaceAlt: '#232A26',
    border: '#2E3732',
    tint: tintColorDark,
    icon: '#A39D93',
    tabIconDefault: '#8A857D',
    tabIconSelected: tintColorDark,
    calm: '#5CB3C6',
    warning: '#F0A65C',
    danger: '#E06C6E',
    success: '#6ACB95',
    highlight: '#3A2C22',
  },
};

export const Fonts = Platform.select({
  ios: {
    display: 'Georgia',
    body: 'Avenir Next',
    label: 'Avenir Next Condensed',
    mono: 'Menlo',
    sans: 'Avenir Next',
    serif: 'Georgia',
    rounded: 'Avenir Next Condensed',
  },
  android: {
    display: 'serif',
    body: 'sans-serif-condensed',
    label: 'sans-serif-condensed',
    mono: 'monospace',
    sans: 'sans-serif-condensed',
    serif: 'serif',
    rounded: 'sans-serif-condensed',
  },
  default: {
    display: 'serif',
    body: 'sans-serif-condensed',
    label: 'sans-serif-condensed',
    mono: 'monospace',
    sans: 'sans-serif-condensed',
    serif: 'serif',
    rounded: 'sans-serif-condensed',
  },
  web: {
    display: "Georgia, 'Times New Roman', serif",
    body: "'Avenir Next', 'Gill Sans', 'Trebuchet MS', sans-serif",
    label: "'Avenir Next Condensed', 'Gill Sans', 'Trebuchet MS', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    sans: "'Avenir Next', 'Gill Sans', 'Trebuchet MS', sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'Avenir Next Condensed', 'Gill Sans', 'Trebuchet MS', sans-serif",
  },
});
