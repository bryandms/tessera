import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'tessera';
import { themeExamples } from 'tessera-examples';

export default function ThemeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={{
        flex: 1,
        backgroundColor: theme.palette.background.default,
      }}>
      <ScrollView contentContainerStyle={styles.content}>
        {themeExamples.map(example => (
          <View key={example.id} style={styles.section}>
            <Text style={[styles.title, { color: theme.palette.text.primary }]}>
              {example.title}
            </Text>
            {example.description ? (
              <Text
                style={[
                  styles.description,
                  { color: theme.palette.text.secondary },
                ]}>
                {example.description}
              </Text>
            ) : null}
            <example.Component />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 24,
  },
  section: {
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
  },
});
