import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useTheme } from 'tessera';

export default function Index() {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        backgroundColor: theme.palette.background.default,
      }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: '700',
          color: theme.palette.text.primary,
        }}>
        Tessera
      </Text>
      <Link
        href="/theme"
        accessibilityRole="link"
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: theme.palette.primary.textColor,
        }}>
        Theme
      </Link>
      <Link
        href="/typography"
        accessibilityRole="link"
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: theme.palette.primary.textColor,
        }}>
        Typography
      </Link>
    </SafeAreaView>
  );
}
