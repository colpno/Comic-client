import { lazy } from 'react';

export const ComicPage = lazy(() => import('./ComicPage/ComicPage.tsx'));
export const ErrorPage = lazy(() => import('./errors/ErrorPage.tsx'));

export { default as HomePage } from './HomePage/HomePage.tsx';
