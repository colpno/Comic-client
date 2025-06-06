import { createApi } from '@reduxjs/toolkit/query/react';

import { serverUrl } from '~/configs/appConf';
import { REDUCER_PATH_BASE } from '~/constants/reduxConstants';
import baseQuery from '~/libs/axios/baseQuery.ts';
import { TAG_FOLLOW } from './apiConstants.ts';

const api = createApi({
  reducerPath: REDUCER_PATH_BASE,
  baseQuery: baseQuery({ baseURL: serverUrl }),
  endpoints: () => ({}),
  tagTypes: [TAG_FOLLOW],
});

export default api;
