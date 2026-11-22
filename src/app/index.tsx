import { Link } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, styles } from '@/workouts/styles';
import { useWorkouts } from '@/workouts/storage';

function displayDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export default function HistoryScreen() {
  const { history, reload } = useWorkouts();

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.screen}>
      {history.status === 'ready' ? (
        <FlatList
          contentContainerStyle={styles.content}
          data={history.entries}
          keyExtractor={(entry) => entry.id}
          ListHeaderComponent={(
            <Link href="/log" asChild>
              <Pressable accessibilityRole="button" style={styles.button}>
                <Text style={styles.buttonLabel}>Add Exercise</Text>
              </Pressable>
            </Link>
          )}
          ListEmptyComponent={(
            <View style={styles.card}>
              <Text style={styles.text}>No workouts before.</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.muted}>{displayDate(item.date)}</Text>
              <Text style={[styles.text, { fontWeight: '700' }]}>{item.name}</Text>
              <Text style={styles.muted}>
                {item.weight} lb · {item.sets} {item.sets === 1 ? 'set' : 'sets'}
              </Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.content}>
          {history.status === 'loading' ? (
            <ActivityIndicator accessibilityLabel="Loading workout history" color={colors.accent} />
          ) : (
            <>
              <Text style={styles.error}>Workout history could not be loaded.</Text>
              <Pressable accessibilityRole="button" onPress={reload} style={styles.button}>
                <Text style={styles.buttonLabel}>Try Again</Text>
              </Pressable>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
