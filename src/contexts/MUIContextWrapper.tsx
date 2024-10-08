import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import '~/libs/moment/config.ts';
import { getTheme } from '~/libs/mui/theme.ts';
import { RootState } from '~/libs/redux/store.ts';

interface ContextWrapperProps {
  children: React.ReactNode;
}

function MUIContextWrapper({ children }: ContextWrapperProps) {
  const themeMode = useSelector((state: RootState) => state.common.theme);
  const theme = getTheme(themeMode);

  useEffect(() => {
    document.body.classList.toggle('dark', themeMode === 'dark');
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default MUIContextWrapper;
