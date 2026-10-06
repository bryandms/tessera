import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, useTheme } from 'tessera';
import { type CatalogExample, typographyExamples } from 'tessera-examples';

const examples: CatalogExample[] = typographyExamples;

export default function TypographyScreen() {
  const theme = useTheme();
  const rootStyle = StyleSheet.flatten([
    styles.container,
    { backgroundColor: theme.palette.background.default },
  ]);

  return (
    <SafeAreaView style={rootStyle} edges={['top', 'bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {examples.map(({ id, title, description, Component }) => (
          <View key={id} style={styles.example}>
            <Typography
              variant="h4"
              style={{ color: theme.palette.text.primary }}>
              {title}
            </Typography>
            {description ? (
              <Typography
                variant="caption"
                style={{ color: theme.palette.text.secondary }}>
                {description}
              </Typography>
            ) : null}
            <Component />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    gap: 32,
    padding: 24,
  },
  example: {
    gap: 8,
  },
});
