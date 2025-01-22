import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useLazyRefreshAccessTokenQuery } from '~/apis/authApis.ts';
import { setAccessToken } from '~/libs/redux/slices/authSlice.ts';
import { RootState, useAppDispatch } from '~/libs/redux/store.ts';

function AccessTokenRefresher() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [refreshToken] = useLazyRefreshAccessTokenQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      refreshToken()
        .unwrap()
        .then((response) => {
          if (response && 'accessToken' in response) dispatch(setAccessToken(response.accessToken));
        });
    }
  }, [isLoggedIn]);

  return <></>;
}

export default AccessTokenRefresher;
