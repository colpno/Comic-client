import { RouteObject } from 'react-router-dom';

import { ProtectedLayout } from '~/layouts/index.ts';

const protectedRoutes: RouteObject = {
  Component: ProtectedLayout,
  children: [],
};

export default protectedRoutes;
