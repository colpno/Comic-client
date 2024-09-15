import { lazy } from 'react';

export const LoginPage = lazy(() => import('./LoginPage.tsx'));

export { default as ErrorPage } from './error-page/ErrorPage.tsx';
export { default as HomePage } from './HomePage.tsx';
export { default as LoadingPage } from './LoadingPage.tsx';
