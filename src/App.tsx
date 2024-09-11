import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { Provider } from 'react-redux';

import { theme } from './libs/mui/theme.ts';
import store from './libs/redux/store.ts';
import { LoadingPage } from './pages/index.ts';

function App() {
  return (
    <ContextWrapper>
      <span className="text-red-500">Hello World!</span>
      <LoadingPage />
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
