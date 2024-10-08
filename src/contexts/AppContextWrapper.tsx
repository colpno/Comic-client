import { Provider } from 'react-redux';

import '~/libs/moment/config.ts';
import store from '~/libs/redux/store.ts';
import MUIContextWrapper from './MUIContextWrapper.tsx';

interface ContextWrapperProps {
  children: React.ReactNode;
}

function AppContextWrapper({ children }: ContextWrapperProps) {
  return (
    <Provider store={store}>
      <MUIContextWrapper>{children}</MUIContextWrapper>
    </Provider>
  );
}

export default AppContextWrapper;
