import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Reveal } from '@/components/ui/reveal';
import { ThemedText } from '@/components/themed-text';
import { TOP_BAR_BASE_HEIGHT, TOP_BAR_CONTENT_GAP } from '@/constants/layout';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const sensorSnapshot = {
  moisture: 78,
  tilt: 4.2,
  vibration: 0.36,
  station: 'VR-02',
  updatedAt: '10:24',
};

const alerts = [
  { title: 'Soil moisture accelerating', detail: 'North ridge +12% in 4h' },
  { title: 'Micro-vibrations detected', detail: 'Clustered near Zone B' },
  { title: 'Drainage capacity low', detail: 'Expected overflow in 2h' },
];

const sensors = [
  { label: 'Soil moisture', value: `${sensorSnapshot.moisture}%`, trend: 'Rising' },
  { label: 'Tilt delta', value: `${sensorSnapshot.tilt}°`, trend: 'Stable' },
  { label: 'Micro-vibration', value: `${sensorSnapshot.vibration} g`, trend: 'Faint' },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function computeRiskScore() {
  const moistureScore = clamp(sensorSnapshot.moisture / 100, 0, 1);
  const tiltScore = clamp(sensorSnapshot.tilt / 15, 0, 1);
  const vibrationScore = clamp(sensorSnapshot.vibration / 1.2, 0, 1);

  return Math.round((moistureScore * 0.45 + tiltScore * 0.35 + vibrationScore * 0.2) * 100);
}

function getRiskLevel(score: number) {
  if (score >= 70) {
    return { label: 'High', key: 'danger' as const };
  }
  if (score >= 40) {
    return { label: 'Moderate', key: 'warning' as const };
  }
  return { label: 'Low', key: 'success' as const };
}

export default function EarlyWarningScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const topOffset = TOP_BAR_BASE_HEIGHT + insets.top + TOP_BAR_CONTENT_GAP;
  const riskScore = computeRiskScore();
  const riskLevel = getRiskLevel(riskScore);

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
        <View style={[styles.ring, { borderColor: palette.border }]} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: topOffset }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <ThemedText type="eyebrow" style={{ color: palette.muted }}>
            Smart Landslide Early Warning
          </ThemedText>
          <ThemedText type="display" style={{ marginTop: 6 }}>
            Landslide Shield
          </ThemedText>
          <ThemedText style={[styles.heroBody, { color: palette.muted }]}>
            Real-time risk scoring from moisture, tilt, and vibration sensing. Built for ICAMES.
          </ThemedText>
          <View style={styles.heroMeta}>
            <View style={[styles.liveDot, { backgroundColor: palette.success }]} />
            <ThemedText type="caption" style={{ color: palette.muted }}>
              Live · Station {sensorSnapshot.station} · Updated {sensorSnapshot.updatedAt}
            </ThemedText>
          </View>
        </View>

        <Reveal>
          <View style={[styles.card, { backgroundColor: palette.surface }]}>
            <View style={styles.cardHeader}>
              <ThemedText type="subtitle">Current Risk</ThemedText>
              <View style={[styles.riskBadge, { backgroundColor: palette[riskLevel.key] }]}>
                <Text style={[styles.riskBadgeText, { color: '#FFF5F2' }]}>
                  {riskLevel.label}
                </Text>
              </View>
            </View>
            <View style={styles.riskScoreRow}>
              <Text style={[styles.riskScore, { color: palette.text }]}>{riskScore}</Text>
              <View>
                <ThemedText type="caption" style={{ color: palette.muted }}>
                  Rule-based score
                </ThemedText>
                <ThemedText type="caption" style={{ color: palette.muted }}>
                  Moisture 45% · Tilt 35% · Vibration 20%
                </ThemedText>
              </View>
            </View>
            <View style={styles.metricRow}>
              {sensors.map((sensor) => (
                <View key={sensor.label} style={styles.metric}>
                  <ThemedText type="caption" style={{ color: palette.muted }}>
                    {sensor.label}
                  </ThemedText>
                  <Text style={[styles.metricValue, { color: palette.text }]}>
                    {sensor.value}
                  </Text>
                  <ThemedText type="caption" style={{ color: palette.muted }}>
                    {sensor.trend}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        </Reveal>

        <Reveal delay={120}>
          <View style={[styles.card, { backgroundColor: palette.surface }]}>
            <ThemedText type="subtitle">Early Warning Feed</ThemedText>
            <View style={styles.alertList}>
              {alerts.map((alert) => (
                <View key={alert.title} style={styles.alertItem}>
                  <View style={[styles.alertDot, { backgroundColor: palette.warning }]} />
                  <View style={styles.alertText}>
                    <ThemedText type="defaultSemiBold">{alert.title}</ThemedText>
                    <ThemedText type="caption" style={{ color: palette.muted }}>
                      {alert.detail}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Reveal>

        <Reveal delay={220}>
          <View style={[styles.card, { backgroundColor: palette.surface }]}>
            <ThemedText type="subtitle">Response Snapshot</ThemedText>
            <View style={styles.responseRow}>
              <View style={styles.responseCell}>
                <Text style={[styles.responseValue, { color: palette.text }]}>12</Text>
                <ThemedText type="caption" style={{ color: palette.muted }}>
                  Households alerted
                </ThemedText>
              </View>
              <View style={styles.responseCell}>
                <Text style={[styles.responseValue, { color: palette.text }]}>3</Text>
                <ThemedText type="caption" style={{ color: palette.muted }}>
                  SOS active
                </ThemedText>
              </View>
              <View style={styles.responseCell}>
                <Text style={[styles.responseValue, { color: palette.text }]}>7</Text>
                <ThemedText type="caption" style={{ color: palette.muted }}>
                  Responders en route
                </ThemedText>
              </View>
            </View>
            <View style={styles.mapShell}>
              <View style={[styles.mapBand, { backgroundColor: palette.surfaceAlt }]} />
              <View style={[styles.mapPin, { backgroundColor: palette.danger }]} />
              <View style={[styles.mapPin, { backgroundColor: palette.warning, left: 80 }]} />
              <View style={[styles.mapPin, { backgroundColor: palette.success, left: 140 }]} />
              <ThemedText type="caption" style={[styles.mapLabel, { color: palette.muted }]}>
                Zone view (demo)
              </ThemedText>
            </View>
          </View>
        </Reveal>

        <Reveal delay={320}>
          <View style={[styles.card, { backgroundColor: palette.surface }]}>
            <ThemedText type="subtitle">Quick Actions</ThemedText>
            <View style={styles.actionRow}>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => [
                  styles.actionButton,
                  {
                    borderColor: palette.border,
                    backgroundColor: pressed ? palette.surfaceAlt : palette.surface,
                  },
                ]}>
                <Text style={[styles.actionTitle, { color: palette.text }]}>Report crack</Text>
                <ThemedText type="caption" style={{ color: palette.muted }}>
                  Community field report
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => [
                  styles.actionButton,
                  {
                    borderColor: palette.border,
                    backgroundColor: pressed ? palette.surfaceAlt : palette.surface,
                  },
                ]}>
                <Text style={[styles.actionTitle, { color: palette.text }]}>Open SOS</Text>
                <ThemedText type="caption" style={{ color: palette.muted }}>
                  Send emergency status
                </ThemedText>
              </Pressable>
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
    right: -100,
  },
  blobSecondary: {
    width: 320,
    height: 320,
    bottom: -180,
    left: -120,
  },
  ring: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 999,
    borderWidth: 1,
    top: 120,
    right: -60,
    opacity: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
    gap: 18,
  },
  hero: {
    gap: 8,
    marginBottom: 6,
  },
  heroBody: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: Fonts.body,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  card: {
    borderRadius: 22,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    gap: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  riskBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  riskBadgeText: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: Fonts.label,
  },
  riskScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  riskScore: {
    fontSize: 46,
    fontFamily: Fonts.display,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    gap: 4,
  },
  metricValue: {
    fontSize: 18,
    fontFamily: Fonts.display,
  },
  alertList: {
    gap: 12,
  },
  alertItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  alertDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    marginTop: 6,
  },
  alertText: {
    flex: 1,
    gap: 2,
  },
  responseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  responseCell: {
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  responseValue: {
    fontSize: 24,
    fontFamily: Fonts.display,
  },
  mapShell: {
    height: 120,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  mapBand: {
    position: 'absolute',
    height: 12,
    width: '120%',
    top: 50,
    left: -20,
    transform: [{ rotate: '-6deg' }],
    opacity: 0.7,
  },
  mapPin: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    left: 30,
    top: 40,
  },
  mapLabel: {
    alignSelf: 'flex-end',
    paddingRight: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: Fonts.body,
    fontWeight: '600',
  },
});
