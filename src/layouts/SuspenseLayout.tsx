import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Loading } from '~/components/index.ts';

function SuspenseLayout() {
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
}

export default SuspenseLayout;
