import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Reveal } from '@/components/ui/reveal';
import { ThemedText } from '@/components/themed-text';
import { TOP_BAR_BASE_HEIGHT, TOP_BAR_CONTENT_GAP } from '@/constants/layout';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const devices = [
  { id: 'IC-204A', location: 'North Slope', status: 'Online', battery: '82%' },
  { id: 'IC-197C', location: 'Creek Bed', status: 'Warning', battery: '54%' },
];

const specs = [
  'Soil moisture probe',
  '3-axis tilt sensor',
  'Micro-vibration module',
  'ESP32 + WiFi/LoRa',
  'Solar backup',
];

export default function DevicesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const topOffset = TOP_BAR_BASE_HEIGHT + insets.top + TOP_BAR_CONTENT_GAP;
  const [deviceId, setDeviceId] = useState('');

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={[styles.screen, { backgroundColor: palette.background }]}>
      <View pointerEvents="none" style={styles.atmosphere}>
        <View
          style={[
            styles.blob,
            styles.blobPrimary,
            { backgroundColor: palette.calm },
          ]}
        />
        <View
          style={[
            styles.blob,
            styles.blobSecondary,
            { backgroundColor: palette.highlight },
          ]}
        />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: topOffset }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <ThemedText type="eyebrow" style={{ color: palette.muted }}>
            Device & System Integration
          </ThemedText>
          <ThemedText type="display">Sensor Fleet</ThemedText>
          <ThemedText style={[styles.heroBody, { color: palette.muted }]}>
            Register devices, monitor health, and preview the commercial bundle.
          </ThemedText>
        </View>

        <Reveal>
          <View style={[styles.card, { backgroundColor: palette.surface }]}>
            <ThemedText type="subtitle">Register Device</ThemedText>
            <View style={styles.registerRow}>
              <TextInput
                value={deviceId}
                onChangeText={setDeviceId}
                placeholder="Enter device ID (e.g., IC-204A)"
                placeholderTextColor={palette.muted}
                style={[styles.input, { borderColor: palette.border, color: palette.text }]}
              />
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => [
                  styles.pairButton,
                  { backgroundColor: pressed ? palette.surfaceAlt : palette.tint },
                ]}>
                <Text style={[styles.pairText, { color: palette.text }]}>Pair</Text>
              </Pressable>
            </View>
            <ThemedText type="caption" style={{ color: palette.muted }}>
              Devices sync via Firebase and stream every 2 minutes.
            </ThemedText>
          </View>
        </Reveal>

        <Reveal delay={120}>
          <View style={[styles.card, { backgroundColor: palette.surface }]}>
            <ThemedText type="subtitle">Connected Sensors</ThemedText>
            <View style={styles.deviceList}>
              {devices.map((device) => (
                <View key={device.id} style={styles.deviceRow}>
                  <View>
                    <Text style={[styles.deviceId, { color: palette.text }]}>{device.id}</Text>
                    <ThemedText type="caption" style={{ color: palette.muted }}>
                      {device.location}
                    </ThemedText>
                  </View>
                  <View style={styles.deviceMeta}>
                    <View
                      style={[
                        styles.statusDot,
                        {
                          backgroundColor:
                            device.status === 'Online' ? palette.success : palette.warning,
                        },
                      ]}
                    />
                    <ThemedText type="caption" style={{ color: palette.muted }}>
                      {device.status} · {device.battery}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Reveal>

        <Reveal delay={220}>
          <View style={[styles.card, { backgroundColor: palette.surface }]}>
            <ThemedText type="subtitle">Hardware Specs</ThemedText>
            <View style={styles.specRow}>
              {specs.map((item) => (
                <View key={item} style={[styles.specChip, { borderColor: palette.border }]}>
                  <Text style={[styles.specText, { color: palette.text }]}>{item}</Text>
                </View>
              ))}
            </View>
            <ThemedText type="caption" style={{ color: palette.muted }}>
              Rugged enclosure · IP65 · 12-month service interval
            </ThemedText>
          </View>
        </Reveal>

        <Reveal delay={320}>
          <View style={[styles.card, { backgroundColor: palette.surface }]}>
            <ThemedText type="subtitle">Deployment Package</ThemedText>
            <View style={styles.packageRow}>
              <View style={styles.packageItem}>
                <ThemedText type="caption" style={{ color: palette.muted }}>
                  Estimated price
                </ThemedText>
                <Text style={[styles.packageValue, { color: palette.text }]}>€240</Text>
              </View>
              <View style={styles.packageItem}>
                <ThemedText type="caption" style={{ color: palette.muted }}>
                  Coverage
                </ThemedText>
                <Text style={[styles.packageValue, { color: palette.text }]}>1–2 ha</Text>
              </View>
            </View>
            <View style={styles.packageNote}>
              <ThemedText type="caption" style={{ color: palette.muted }}>
                Demo storefront for pitch only. Real pricing depends on deployment.
              </ThemedText>
            </View>
          </View>
        </Reveal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  atmosphere: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.18,
  },
  blobPrimary: {
    width: 260,
    height: 260,
    top: -140,
    left: -90,
  },
  blobSecondary: {
    width: 280,
    height: 280,
    bottom: -160,
    right: -110,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
    gap: 18,
  },
  hero: {
    gap: 8,
  },
  heroBody: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: Fonts.body,
  },
  card: {
    borderRadius: 22,
    padding: 18,
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  registerRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Fonts.body,
  },
  pairButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  pairText: {
    fontFamily: Fonts.body,
    fontWeight: '600',
  },
  deviceList: {
    gap: 12,
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceId: {
    fontSize: 18,
    fontFamily: Fonts.display,
  },
  deviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  specRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  specChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  specText: {
    fontFamily: Fonts.body,
    fontSize: 13,
  },
  packageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  packageItem: {
    gap: 4,
  },
  packageValue: {
    fontSize: 20,
    fontFamily: Fonts.display,
  },
  packageNote: {
    marginTop: 6,
  },
});
