import { router, useNavigation } from 'expo-router';
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, styles } from '@/workouts/styles';
import { useWorkouts } from '@/workouts/storage';

export default function LogScreen() {
  const navigation = useNavigation();
  const { history, save } = useWorkouts();
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const submitting = useRef(false);

  async function submit() {
    if (submitting.current || history.status !== 'ready') return;

    const exerciseName = name.trim();
    const pounds = Number(weight.trim().replace(',', '.'));
    const setCount = Number(sets.trim());

    if (!exerciseName) {
      setError('Enter an exercise name.');
      return;
    }
    if (!/^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(weight.trim()) || !Number.isFinite(pounds)) {
      setError('Enter a weight of 0 lb or more.');
      return;
    }
    if (!/^\d+$/.test(sets.trim()) || !Number.isSafeInteger(setCount) || setCount < 1) {
      setError('Enter at least 1 set.');
      return;
    }

    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const date = `${today.getFullYear()}-${month}-${day}`;

    submitting.current = true;
    setSaving(true);
    setError('');
    try {
      await save({ name: exerciseName, weight: pounds, sets: setCount, date });
      if (navigation.isFocused()) router.dismissTo('/');
    } catch {
      setError('Could not save your exercise. Try again.');
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  }

  const disabled = saving || history.status !== 'ready';

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.field}>
            <Text style={styles.text}>Exercise name</Text>
            <TextInput
              accessibilityLabel="Exercise name"
              editable={!saving}
              onChangeText={setName}
              placeholder="Bench press"
              placeholderTextColor={colors.muted}
              style={styles.input}
              value={name}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.text}>Weight (lb)</Text>
            <TextInput
              accessibilityLabel="Weight in pounds"
              editable={!saving}
              keyboardType="decimal-pad"
              onChangeText={setWeight}
              placeholder="0 for bodyweight"
              placeholderTextColor={colors.muted}
              style={styles.input}
              value={weight}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.text}>Sets</Text>
            <TextInput
              accessibilityLabel="Number of sets"
              editable={!saving}
              keyboardType="number-pad"
              onChangeText={setSets}
              placeholder="3"
              placeholderTextColor={colors.muted}
              style={styles.input}
              value={sets}
            />
          </View>
          {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
          {history.status === 'error' ? (
            <Text accessibilityRole="alert" style={styles.error}>Go back and reload Workout History before saving.</Text>
          ) : null}
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled, busy: saving }}
            disabled={disabled}
            onPress={submit}
            style={[styles.button, disabled && { opacity: 0.55 }]}
          >
            <Text style={styles.buttonLabel}>{saving ? 'Saving…' : 'Save'}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
