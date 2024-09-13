import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Provider } from 'react-redux';

import '~/libs/moment/config.ts';
import { theme } from '~/libs/mui/theme.ts';
import store from '~/libs/redux/store.ts';

interface ContextWrapperProps {
  children: React.ReactNode;
}

function AppContextWrapper({ children }: ContextWrapperProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default AppContextWrapper;
