import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import api from '~/apis/index.ts';
import rootReducer from './slices/index.ts';

const middlewares = [api.middleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
