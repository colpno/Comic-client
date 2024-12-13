import { lazy } from 'react';

export const BasicLayout = lazy(() => import('./BasicLayout.tsx'));
export const ReadingLayout = lazy(() => import('./ReadingLayout/ReadingLayout.tsx'));
export const MenuLayout = lazy(() => import('./MenuLayout/MenuLayout.tsx'));
export const SearchLayout = lazy(() => import('./SearchLayout/SearchLayout.tsx'));

export { default as HomeLayout } from './HomeLayout.tsx';
export { default as ProtectedLayout } from './ProtectedLayout.tsx';
export { default as SuspenseLayout } from './SuspenseLayout.tsx';
