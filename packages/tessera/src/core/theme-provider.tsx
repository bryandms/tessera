import { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { createAppTheme } from './theme';
import type { AppTheme, ThemeMode } from './theme';

type ThemeModeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);
const ThemeContext = createContext<AppTheme | null>(null);

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }

  return context;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}

export function ThemeProvider({
  children,
  defaultMode = 'light',
}: PropsWithChildren<{ defaultMode?: ThemeMode }>) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const modeValue = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <ThemeModeContext.Provider value={modeValue}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ThemeModeContext.Provider>
  );
}
