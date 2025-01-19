import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { REDUCER_PATH_COMMON } from '~/constants/reduxConstants.ts';
import { CommonReducerState } from '../slices/commonSlice.ts';

const whitelist: (keyof CommonReducerState)[] = ['theme', 'read'];

const commonPersistConfig: PersistConfig<CommonReducerState> = {
  key: REDUCER_PATH_COMMON,
  storage,
  whitelist,
};

export default commonPersistConfig;
