import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import api from '~/apis/index.ts';
import { REDUCER_PATH_AUTH, REDUCER_PATH_COMMON } from '~/constants/reduxConstants.ts';
import { authPersistConfig, commonPersistConfig, rootPersistConfig } from '../persist/index.ts';
import authReducer from './authSlice.ts';
import commonReducer from './commonSlice.ts';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [REDUCER_PATH_COMMON]: persistReducer(commonPersistConfig, commonReducer),
  [REDUCER_PATH_AUTH]: persistReducer(authPersistConfig, authReducer),
});

export default persistReducer(rootPersistConfig, rootReducer);
