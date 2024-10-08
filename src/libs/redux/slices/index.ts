import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import api from '~/apis/index.ts';
import { REDUCER_PATH_AUTH, REDUCER_PATH_COMMON } from '~/constants/redux.ts';
import { commonPersistConfig, rootPersistConfig } from '../persist/index.ts';
import authReducer from './auth.ts';
import commonReducer from './common.ts';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [REDUCER_PATH_COMMON]: persistReducer(commonPersistConfig, commonReducer),
  [REDUCER_PATH_AUTH]: authReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
