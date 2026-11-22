import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/workouts/styles';
import { WorkoutProvider } from '@/workouts/storage';

export default function Layout() {
  return (
    <WorkoutProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}>
        <Stack.Screen name="index" options={{ title: 'Workout History' }} />
        <Stack.Screen name="log" options={{ title: 'Log Exercise' }} />
      </Stack>
    </WorkoutProvider>
  );
}
