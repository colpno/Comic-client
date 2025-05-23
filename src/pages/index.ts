import { lazy } from 'react';

export const ComicPage = lazy(() => import('./ComicPage/ComicPage.tsx'));
export const ErrorPage = lazy(() => import('./ErrorPage/ErrorPage.tsx'));
export const ReadingPage = lazy(() => import('./ReadingPage/ReadingPage.tsx'));
export const RankingPage = lazy(() => import('./RankingPage/RankingPage.tsx'));
export const LatestUpdatesPage = lazy(() => import('./LatestUpdatesPage/LatestUpdatesPage.tsx'));
export const NewProductsPage = lazy(() => import('./NewProductsPage/NewProductsPage.tsx'));
export const CompletedPage = lazy(() => import('./CompletedPage/CompletedPage.tsx'));
export const SearchPage = lazy(() => import('./SearchPage/SearchPage.tsx'));
export const LoginPage = lazy(() => import('./LoginPage.tsx'));
export const HistoryPage = lazy(() => import('./HistoryPage/HistoryPage.tsx'));
export const FollowPage = lazy(() => import('./FollowPage/FollowPage.tsx'));
export const ComicsByGenrePage = lazy(() => import('./ComicsByGenrePage/ComicsByGenrePage.tsx'));
export const SignUpPage = lazy(() => import('./SignUpPage.tsx'));
export const ForgotPasswordPage = lazy(() => import('./ForgotPasswordPage.tsx'));
export const ProfilePage = lazy(() => import('./ProfilePage.tsx'));

export { default as HomePage } from './HomePage/HomePage.tsx';
export { default as MaintenancePage } from './MaintenancePage.tsx';
