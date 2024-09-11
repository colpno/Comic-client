import { lazy } from 'react';

export { default as LoadingPage } from './LoadingPage.tsx';
export { default as ErrorPage } from './error/ErrorPage.tsx';

export const LoginPage = lazy(() => import('./LoginPage.tsx'));
