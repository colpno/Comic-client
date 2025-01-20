import { RouterProvider } from 'react-router-dom';

import { AccessTokenRefresher, DeviceWatcher, Toast } from './components/index.ts';
import AppContextWrapper from './contexts/AppContextWrapper.tsx';
import { router } from './routes/index.ts';

function App() {
  return (
    <AppContextWrapper>
      <RouterProvider router={router} />
      <Toast />
      <DeviceWatcher />
      <AccessTokenRefresher />
    </AppContextWrapper>
  );
}

export default App;
