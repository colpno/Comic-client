import api from '~/apis/index.ts';
import { REDUCER_PATH_AUTH, REDUCER_PATH_COMMON } from '~/constants/redux.ts';
import authReducer from './auth.ts';
import commonReducer from './common.ts';

const rootReducer = {
  [api.reducerPath]: api.reducer,
  [REDUCER_PATH_COMMON]: commonReducer,
  [REDUCER_PATH_AUTH]: authReducer,
};

export default rootReducer;
