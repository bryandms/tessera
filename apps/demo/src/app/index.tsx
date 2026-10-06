import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useTheme, useThemeMode } from 'tessera';

const componentLinks = [{ href: '/typography', label: 'Typography' }] as const;

export default function Index() {
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();
  const rootStyle = StyleSheet.flatten([
    styles.container,
    { backgroundColor: theme.palette.background.default },
  ]);

  return (
    <SafeAreaView style={rootStyle} edges={['top', 'bottom']}>
      <Image
        source={require('../../assets/images/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text
        style={[theme.typography.h3, { color: theme.palette.text.primary }]}>
        Tessera
      </Text>

      <Pressable
        onPress={() => setMode(mode === 'light' ? 'dark' : 'light')}
        style={[
          styles.modeToggle,
          {
            backgroundColor: theme.palette.primary.main,
            borderRadius: theme.radius.md,
          },
        ]}>
        <Text
          style={{
            color: theme.palette.primary.contrastText,
            ...theme.typography.button,
          }}>
          Switch to {mode === 'light' ? 'dark' : 'light'}
        </Text>
      </Pressable>

      <View style={styles.links}>
        {componentLinks.map(({ href, label }) => {
          const linkStyle = StyleSheet.flatten([
            styles.link,
            {
              borderRadius: theme.radius.md,
              borderColor: theme.palette.divider,
            },
          ]);

          return (
            <Link key={href} href={href} asChild>
              <Pressable style={linkStyle}>
                <Text
                  style={[
                    theme.typography.body1,
                    { color: theme.palette.text.primary },
                  ]}>
                  {label}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    padding: 24,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 24,
  },
  links: {
    gap: 12,
  },
  modeToggle: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  link: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
  },
});
