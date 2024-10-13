import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { RootState } from '~/libs/redux/store.ts';

function ProtectedLayout() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) return null;

  return <Outlet />;
}

export default ProtectedLayout;
