import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'tessera';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="theme" options={{ title: 'Theme' }} />
      </Stack>
    </ThemeProvider>
  );
}
