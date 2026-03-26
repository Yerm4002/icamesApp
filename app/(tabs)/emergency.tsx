import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Reveal } from '@/components/ui/reveal';
import { ThemedText } from '@/components/themed-text';
import { TOP_BAR_BASE_HEIGHT, TOP_BAR_CONTENT_GAP } from '@/constants/layout';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const statusOptions = ['I am safe', 'Injured', 'Trapped', 'With others'];

export default function EmergencyScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const topOffset = TOP_BAR_BASE_HEIGHT + insets.top + TOP_BAR_CONTENT_GAP;
  const [status, setStatus] = useState('Injured');
  const [severity, setSeverity] = useState(3);
  const [peopleCount, setPeopleCount] = useState('3');
  const [injuredCount, setInjuredCount] = useState('1');
  const [childrenPresent, setChildrenPresent] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={[styles.screen, { backgroundColor: palette.background }]}>
      <View pointerEvents="none" style={styles.atmosphere}>
        <View
          style={[
            styles.blob,
            styles.blobPrimary,
            { backgroundColor: palette.danger },
          ]}
        />
        <View
          style={[
            styles.blob,
            styles.blobSecondary,
            { backgroundColor: palette.warning },
          ]}
        />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: topOffset }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <ThemedText type="eyebrow" style={{ color: palette.muted }}>
            Emergency Response
          </ThemedText>
          <ThemedText type="display">SOS Dispatch</ThemedText>
          <ThemedText style={[styles.heroBody, { color: palette.muted }]}>
            One-tap alerting with location, status, and last known risk score.
          </ThemedText>
        </View>

        <Reveal>
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              styles.sosButton,
              { backgroundColor: pressed ? '#A92E2F' : palette.danger },
            ]}>
            <Text style={styles.sosText}>Send SOS</Text>
            <ThemedText type="caption" style={{ color: '#FFF5F2' }}>
              Auto-sends GPS + last risk level
            </ThemedText>
          </Pressable>
        </Reveal>

        <Reveal delay={120}>
          <View style={[styles.card, { backgroundColor: palette.surface }]}>
            <ThemedText type="subtitle">Your Status</ThemedText>
            <View style={styles.statusRow}>
              {statusOptions.map((option) => {
                const selected = status === option;
                return (
                  <Pressable
                    key={option}
                    onPress={() => setStatus(option)}
                    style={[
                      styles.statusChip,
                      {
                        borderColor: selected ? palette.danger : palette.border,
                        backgroundColor: selected ? palette.highlight : palette.surface,
                      },
                    ]}>
                    <Text style={[styles.statusText, { color: palette.text }]}>{option}</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.severityRow}>
              <ThemedText type="caption" style={{ color: palette.muted }}>
                Injury severity
              </ThemedText>
              <View style={styles.severityScale}>
                {[1, 2, 3, 4, 5].map((level) => {
                  const active = severity === level;
                  return (
                    <Pressable
                      key={level}
                      onPress={() => setSeverity(level)}
                      style={[
                        styles.severityDot,
                        {
                          backgroundColor: active ? palette.danger : palette.surfaceAlt,
                          borderColor: active ? palette.danger : palette.border,
                        },
                      ]}>
                      <Text style={[styles.severityText, { color: palette.text }]}>{level}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </Reveal>

        <Reveal delay={200}>
          <View style={[styles.card, { backgroundColor: palette.surface }]}>
            <ThemedText type="subtitle">People With You</ThemedText>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <ThemedText type="caption" style={{ color: palette.muted }}>
                  Total people
                </ThemedText>
                <TextInput
                  value={peopleCount}
                  onChangeText={setPeopleCount}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={palette.muted}
                  style={[styles.input, { borderColor: palette.border, color: palette.text }]}
                />
              </View>
              <View style={styles.inputGroup}>
                <ThemedText type="caption" style={{ color: palette.muted }}>
                  Injured
                </ThemedText>
                <TextInput
                  value={injuredCount}
                  onChangeText={setInjuredCount}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={palette.muted}
                  style={[styles.input, { borderColor: palette.border, color: palette.text }]}
                />
              </View>
            </View>
            <View style={styles.switchRow}>
              <ThemedText type="caption" style={{ color: palette.muted }}>
                Children present
              </ThemedText>
              <Switch
                value={childrenPresent}
                onValueChange={setChildrenPresent}
                trackColor={{ true: palette.warning, false: palette.border }}
                thumbColor={palette.surface}
              />
            </View>
          </View>
        </Reveal>

        <Reveal delay={280}>
          <View style={[styles.card, { backgroundColor: palette.surface }]}>
            <ThemedText type="subtitle">Optional Message</ThemedText>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Short note or landmark (10s voice supported in full build)"
              placeholderTextColor={palette.muted}
              style={[
                styles.messageInput,
                { borderColor: palette.border, color: palette.text },
              ]}
              multiline
              numberOfLines={4}
            />
            <View style={styles.offlineRow}>
              <View style={[styles.offlineDot, { backgroundColor: palette.success }]} />
              <ThemedText type="caption" style={{ color: palette.muted }}>
                Offline mode ready · queued if no signal
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
    opacity: 0.16,
  },
  blobPrimary: {
    width: 260,
    height: 260,
    top: -140,
    left: -80,
  },
  blobSecondary: {
    width: 280,
    height: 280,
    bottom: -150,
    right: -120,
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
  sosButton: {
    borderRadius: 26,
    paddingVertical: 22,
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  sosText: {
    color: '#FFF5F2',
    fontSize: 24,
    fontFamily: Fonts.display,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
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
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statusChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusText: {
    fontFamily: Fonts.body,
    fontSize: 14,
  },
  severityRow: {
    gap: 10,
  },
  severityScale: {
    flexDirection: 'row',
    gap: 10,
  },
  severityDot: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  severityText: {
    fontFamily: Fonts.display,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 14,
  },
  inputGroup: {
    flex: 1,
    gap: 6,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Fonts.body,
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageInput: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    fontFamily: Fonts.body,
    minHeight: 110,
    textAlignVertical: 'top',
  },
  offlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  offlineDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
});
