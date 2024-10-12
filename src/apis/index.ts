import { createApi } from '@reduxjs/toolkit/query/react';

import { SERVER_URL } from '~/constants/api.ts';
import { REDUCER_PATH_BASE } from '~/constants/redux.ts';
import baseQuery from '~/libs/axios/baseQuery.ts';

const api = createApi({
  reducerPath: REDUCER_PATH_BASE,
  baseQuery: baseQuery({ baseURL: SERVER_URL }),
  endpoints: () => ({}),
  refetchOnReconnect: true,
});

export default api;
