import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, useTheme } from 'tessera';
import { typographyExamples } from 'tessera-examples';

export default function TypographyScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={{
        flex: 1,
        backgroundColor: theme.palette.background.default,
      }}>
      <ScrollView contentContainerStyle={styles.content}>
        {typographyExamples.map(example => (
          <View key={example.id} style={styles.section}>
            <Typography variant="h6">{example.title}</Typography>
            {example.description ? (
              <Typography variant="body2" color="secondary">
                {example.description}
              </Typography>
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
});
