import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import LoadingPage from '~/pages/LoadingPage.tsx';

function SuspenseLayout() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Outlet />
      <LoadingPage />
    </Suspense>
  );
}

export default SuspenseLayout;
