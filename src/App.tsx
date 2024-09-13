import { RouterProvider } from 'react-router-dom';

import '~/libs/moment/config.ts';
import { Toast } from './components/index.ts';
import AppContextWrapper from './contexts/AppContextWrapper.tsx';
import { LoadingPage } from './pages/index.ts';
import { router } from './routes/index.ts';

function App() {
  return (
    <AppContextWrapper>
      <RouterProvider router={router} />
      <span className="text-red-500">Hello World!</span>
      <LoadingPage />
      <Toast />
    </AppContextWrapper>
  );
}

export default App;
