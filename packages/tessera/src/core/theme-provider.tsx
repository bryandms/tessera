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

/**
 * Returns the current color mode and a setter. Throws outside `ThemeProvider`.
 */
export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }

  return context;
}

/**
 * Returns the active theme. Throws outside `ThemeProvider`.
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}

type ThemeProviderProps = PropsWithChildren<{
  /**
   * Color mode on first render. Change it later with `useThemeMode`.
   * @default 'light'
   */
  defaultMode?: ThemeMode;
}>;

/**
 * Provides the theme to its children and owns the color mode.
 */
export function ThemeProvider({
  children,
  defaultMode = 'light',
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const modeValue = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <ThemeModeContext.Provider value={modeValue}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ThemeModeContext.Provider>
  );
}
