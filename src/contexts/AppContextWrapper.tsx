import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import store from '~/libs/redux/store.ts';
import MUIContextWrapper from './MUIContextWrapper.tsx';

interface ContextWrapperProps {
  children: React.ReactNode;
}

function AppContextWrapper({ children }: ContextWrapperProps) {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <MUIContextWrapper>{children}</MUIContextWrapper>
      </HelmetProvider>
    </Provider>
  );
}

export default AppContextWrapper;
