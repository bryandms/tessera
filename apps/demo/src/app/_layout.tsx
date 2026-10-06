import { Stack } from 'expo-router';
import { ThemeProvider } from 'tessera';

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
