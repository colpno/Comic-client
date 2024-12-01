import { lazy } from 'react';

export { default as DefaultLayout } from './DefaultLayout.tsx';
export { default as HomeLayout } from './HomeLayout.tsx';
export const ReadingLayout = lazy(() => import('./ReadingLayout/ReadingLayout.tsx'));

export { default as ProtectedLayout } from './ProtectedLayout.tsx';
export { default as SuspenseLayout } from './SuspenseLayout.tsx';
