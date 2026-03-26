import { Tabs } from 'expo-router';
import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { TOP_BAR_BASE_HEIGHT } from '@/constants/layout';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const compact = width < 360;
  const topBarHeight = TOP_BAR_BASE_HEIGHT + insets.top;
  const iconSize = compact ? 22 : 26;
  const iconShellSize = compact ? 40 : 46;
  const labelSize = compact ? 10 : 11;
  const iconShellStyle = {
    width: iconShellSize,
    height: iconShellSize,
    borderRadius: iconShellSize / 2,
    borderWidth: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.tint,
        tabBarInactiveTintColor: palette.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
          borderTopWidth: 0,
          height: topBarHeight,
          paddingBottom: compact ? 8 : 10,
          paddingTop: insets.top + (compact ? 4 : 6),
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        },
        tabBarItemStyle: {
          paddingVertical: compact ? 2 : 6,
        },
        tabBarLabelStyle: {
          fontFamily: Fonts.label,
          fontSize: labelSize,
          letterSpacing: compact ? 1 : 1.2,
          textTransform: 'uppercase',
          marginTop: compact ? 2 : 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Early',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                iconShellStyle,
                {
                  borderColor: focused ? palette.tint : palette.border,
                  backgroundColor: focused ? palette.highlight : palette.surface,
                },
              ]}>
              <IconSymbol size={iconSize} name="house.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: 'SOS',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                iconShellStyle,
                {
                  borderColor: focused ? palette.danger : palette.border,
                  backgroundColor: focused ? palette.highlight : palette.surface,
                },
              ]}>
              <IconSymbol size={iconSize} name="exclamationmark.triangle.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                iconShellStyle,
                {
                  borderColor: focused ? palette.calm : palette.border,
                  backgroundColor: focused ? palette.highlight : palette.surface,
                },
              ]}>
              <IconSymbol size={iconSize} name="book.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="devices"
        options={{
          title: 'Devices',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                iconShellStyle,
                {
                  borderColor: focused ? palette.success : palette.border,
                  backgroundColor: focused ? palette.highlight : palette.surface,
                },
              ]}>
              <IconSymbol size={iconSize} name="cpu" color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
