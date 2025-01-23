import { NON_RESOURCES_ENDPOINTS } from './apiConstants.ts';
import api from './index.ts';

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET
    ping: build.query<{ status: 'ok' | 'maintenance' }, void>({
      query: () => ({
        url: NON_RESOURCES_ENDPOINTS.PING(),
      }),
    }),
  }),
});

export const { useLazyPingQuery, usePingQuery } = extendedApi;
