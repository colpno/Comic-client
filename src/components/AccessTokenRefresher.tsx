import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useLazyRefreshAccessTokenQuery } from '~/apis/authApis.ts';
import { setAccessToken } from '~/libs/redux/slices/authSlice.ts';
import { RootState, useAppDispatch } from '~/libs/redux/store.ts';

function AccessTokenRefresher() {
  const { accessToken, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [refreshToken] = useLazyRefreshAccessTokenQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn && !accessToken) {
      refreshToken()
        .unwrap()
        .then((data) => {
          dispatch(setAccessToken(data.accessToken));
        })
        .catch(() => {
          dispatch(setAccessToken(undefined));
        });
    }
  }, [accessToken, isLoggedIn]);

  return <></>;
}

export default AccessTokenRefresher;
