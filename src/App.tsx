import { RouterProvider } from 'react-router-dom';

import '~/libs/moment/config.ts';
import { Toast } from './components/index.ts';
import AppContextWrapper from './contexts/AppContextWrapper.tsx';
import { router } from './routes/index.ts';

function App() {
  return (
    <AppContextWrapper>
      <RouterProvider router={router} />
      <Toast />
    </AppContextWrapper>
  );
}

export default App;
