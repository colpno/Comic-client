import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Provider } from 'react-redux';

import '~/libs/moment/config.ts';
import { Toast } from './components/index.ts';
import { theme } from './libs/mui/theme.ts';
import store from './libs/redux/store.ts';
import { LoadingPage } from './pages/index.ts';

function App() {
  return (
    <ContextWrapper>
      <span className="text-red-500">Hello World!</span>
      <LoadingPage />
      <Toast />
    </ContextWrapper>
  );
}

interface ContextWrapperProps {
  children: React.ReactNode;
}

function ContextWrapper({ children }: ContextWrapperProps) {
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

export default App;
