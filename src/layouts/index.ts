import { lazy } from 'react';

export { default as HomeLayout } from './HomeLayout.tsx';
export const DefaultLayout = lazy(() => import('./DefaultLayout.tsx'));
export const ReadingLayout = lazy(() => import('./ReadingLayout/ReadingLayout.tsx'));
export const MenuLayout = lazy(() => import('./MenuLayout/MenuLayout.tsx'));

export { default as ProtectedLayout } from './ProtectedLayout.tsx';
export { default as SuspenseLayout } from './SuspenseLayout.tsx';
