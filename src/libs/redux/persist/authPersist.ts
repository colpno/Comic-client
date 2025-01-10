import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { REDUCER_PATH_AUTH } from '~/constants/reduxConstants.ts';
import { AuthReducerState } from '../slices/authSlice.ts';

const whitelist: (keyof AuthReducerState)[] = ['isLoggedIn'];

const authPersistConfig: PersistConfig<AuthReducerState> = {
  key: REDUCER_PATH_AUTH,
  storage,
  whitelist,
};

export default authPersistConfig;
