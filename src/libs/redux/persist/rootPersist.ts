import storage from 'redux-persist/lib/storage';

import { REDUCER_PATH_AUTH, REDUCER_PATH_COMMON } from '~/constants/reduxConstants.ts';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [REDUCER_PATH_COMMON, REDUCER_PATH_AUTH],
};

export default rootPersistConfig;
