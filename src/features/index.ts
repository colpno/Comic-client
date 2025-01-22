import { lazy } from 'react';

export const FollowComicCard = lazy(() => import('./cards/FollowComicCard.tsx'));
export const NewArrivalsComicCard = lazy(() => import('./cards/NewArrivalsComicCard.tsx'));
export const RankingComicCard = lazy(() => import('./cards/RankingComicCard.tsx'));
export const SearchingComicCard = lazy(() => import('./cards/SearchingComicCard.tsx'));
export const SelectiveFilterForm = lazy(
  () => import('./forms/SelectiveFilterForm/SelectiveFilterForm.tsx')
);
export const TagFilterButton = lazy(() => import('./advance-buttons/TagFilterButton.tsx'));
export * from './advance-buttons/TagFilterButton.tsx';
export const SortButton = lazy(() => import('./advance-buttons/SortButton.tsx'));

export { default as ComicCard } from './cards/ComicCard.tsx';
export { default as ComicHorizontalCard } from './cards/ComicHorizontalCard.tsx';
export { default as LoginForm } from './forms/LoginForm.tsx';
export * from './forms/SelectiveFilterForm/SelectiveFilterForm.tsx';
export { default as ComicSlider } from './sliders/ComicSlider.tsx';
