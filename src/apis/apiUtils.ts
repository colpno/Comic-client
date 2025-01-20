import { RootState } from '~/libs/redux/store.ts';
import { ApiFailedResponse, ApiRequestArgs } from '~/types/apiTypes.ts';
import api from './index.ts';

/** Parameters of `queryFn` of redux toolkit query endpoint's definition */
type Arguments = Parameters<Exclude<Parameters<Parameters<Parameters<(typeof api)['injectEndpoints']>[0]['endpoints']>[0]['query']>[0]['queryFn'], undefined>>;
type Fetcher = Arguments[3];
type StoreRetriever = Arguments[1]['getState'];
type AttachAuthorization = (args: ApiRequestArgs, apis: StoreRetriever, queryFn: Fetcher) => ReturnType<Fetcher> | {
	error: ApiFailedResponse;
};

export const attachAuthorization: AttachAuthorization = async (args, getState, query) => {
  const state = getState() as RootState;
  const accessToken = state.auth.accessToken;

  if (!accessToken) {
    return {
      error: {
        code: 401,
        reason: 'Login is required',
        error: true,
      },
    };
  }

  return query({
    ...args,
    headers: {
      ...args.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
