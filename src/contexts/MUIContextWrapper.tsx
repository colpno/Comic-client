import { CssBaseline, Theme as MUITheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getThemeConfig } from '~/libs/mui/config';
import { RootState } from '~/libs/redux/store.ts';

interface ContextWrapperProps {
  children: React.ReactNode;
}

function MUIContextWrapper({ children }: ContextWrapperProps) {
  const themeMode = useSelector((state: RootState) => state.common.theme);
  /** User system preference. */
  const isDarkModePreferred = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeConfig, setThemeConfig] = useState<MUITheme | null>(null);

  useEffect(() => {
    const theme = themeMode === 'system' ? (isDarkModePreferred ? 'dark' : 'light') : themeMode;
    document.body.classList.toggle('dark', theme === 'dark');
    setThemeConfig(getThemeConfig(theme));
  }, [themeMode, isDarkModePreferred, setThemeConfig]);

  if (!themeConfig) return null;

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterMoment}>{children}</LocalizationProvider>
    </ThemeProvider>
  );
}

export default MUIContextWrapper;
