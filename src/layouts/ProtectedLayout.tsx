import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { RootState } from '~/libs/redux/store.ts';
import { LoginPage } from '~/pages/index.ts';

function ProtectedLayout() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) return <LoginPage />;

  return <Outlet />;
}

export default ProtectedLayout;
