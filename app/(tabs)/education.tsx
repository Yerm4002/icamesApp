import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Reveal } from '@/components/ui/reveal';
import { ThemedText } from '@/components/themed-text';
import { TOP_BAR_BASE_HEIGHT, TOP_BAR_CONTENT_GAP } from '@/constants/layout';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const guidance = [
  {
    title: 'Before a landslide',
    points: [
      'Map safe routes and meeting points',
      'Keep drainage clear and redirect runoff',
      'Secure heavy items and fuel shutoffs',
    ],
  },
  {
    title: 'During a landslide',
    points: [
      'Move to higher ground immediately',
      'Avoid valleys and river channels',
      'Do not drive through moving debris',
    ],
  },
  {
    title: 'After a landslide',
    points: [
      'Check structural stability before entry',
      'Report new cracks or ground movement',
      'Wait for official clearance to return',
    ],
  },
];

export default function EducationScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const topOffset = TOP_BAR_BASE_HEIGHT + insets.top + TOP_BAR_CONTENT_GAP;

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
            Education & Preparedness
          </ThemedText>
          <ThemedText type="display">Stay Ready</ThemedText>
          <ThemedText style={[styles.heroBody, { color: palette.muted }]}>
            Actionable guidance for families, communities, and first responders.
          </ThemedText>
        </View>

        {guidance.map((section, index) => (
          <Reveal key={section.title} delay={index * 120}>
            <View style={[styles.card, { backgroundColor: palette.surface }]}>
              <ThemedText type="subtitle">{section.title}</ThemedText>
              <View style={styles.pointList}>
                {section.points.map((point) => (
                  <View key={point} style={styles.pointRow}>
                    <View style={[styles.pointDot, { backgroundColor: palette.warning }]} />
                    <Text style={[styles.pointText, { color: palette.text }]}>{point}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Reveal>
        ))}

        <Reveal delay={420}>
          <View style={[styles.card, { backgroundColor: palette.surface }]}>
            <ThemedText type="subtitle">Preparedness Kit</ThemedText>
            <View style={styles.kitRow}>
              {['Water', 'First aid', 'Flashlight', 'Radio', 'Power bank'].map((item) => (
                <View
                  key={item}
                  style={[styles.kitChip, { borderColor: palette.border }]}>
                  <Text style={[styles.kitText, { color: palette.text }]}>{item}</Text>
                </View>
              ))}
            </View>
            <ThemedText type="caption" style={{ color: palette.muted }}>
              Keep one kit per household and refresh every 6 months.
            </ThemedText>
          </View>
        </Reveal>

        <Reveal delay={520}>
          <View style={[styles.card, { backgroundColor: palette.surface }]}>
            <ThemedText type="subtitle">Evacuation Plan</ThemedText>
            <View style={styles.planRow}>
              <View style={styles.planItem}>
                <ThemedText type="caption" style={{ color: palette.muted }}>
                  Primary route
                </ThemedText>
                <Text style={[styles.planValue, { color: palette.text }]}>Hillcrest Road</Text>
              </View>
              <View style={styles.planItem}>
                <ThemedText type="caption" style={{ color: palette.muted }}>
                  Secondary route
                </ThemedText>
                <Text style={[styles.planValue, { color: palette.text }]}>Riverside Loop</Text>
              </View>
            </View>
            <Text style={[styles.planNote, { color: palette.muted }]}>
              Assign roles, practice drills, and share the plan with neighbors.
            </Text>
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
    top: -130,
    right: -90,
  },
  blobSecondary: {
    width: 280,
    height: 280,
    bottom: -160,
    left: -110,
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
  pointList: {
    gap: 10,
  },
  pointRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  pointDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginTop: 6,
  },
  pointText: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: Fonts.body,
    flex: 1,
  },
  kitRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  kitChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  kitText: {
    fontFamily: Fonts.body,
    fontSize: 13,
  },
  planRow: {
    gap: 12,
  },
  planItem: {
    gap: 4,
  },
  planValue: {
    fontSize: 16,
    fontFamily: Fonts.display,
  },
  planNote: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.body,
  },
});
