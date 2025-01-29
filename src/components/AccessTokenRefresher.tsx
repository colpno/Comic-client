import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useLazyRefreshAccessTokenQuery } from '~/apis/authApis.ts';
import { setAccessToken } from '~/libs/redux/slices/authSlice.ts';
import { RootState, useAppDispatch } from '~/libs/redux/store.ts';

function AccessTokenRefresher() {
  const { isLoggedIn, tokenExpiredTime } = useSelector((state: RootState) => state.auth);
  const [refreshTokenQuery] = useLazyRefreshAccessTokenQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isLoggedIn) {
      const refreshToken = async () => {
        return refreshTokenQuery()
          .unwrap()
          .then((response) => {
            if (response && 'accessToken' in response) {
              dispatch(setAccessToken(response.accessToken));
            }
          });
      };

      if (tokenExpiredTime) {
        // Has token expired time
        const expiredTime = new Date(tokenExpiredTime);
        const currentTime = new Date();
        const REQUEST_TIME = 10 * 1000; // 10 seconds, give some time for the request to complete
        const timeDifference = expiredTime.getTime() - currentTime.getTime() - REQUEST_TIME;

        if (timeDifference > 0) {
          // Call refreshToken after timeDifference
          timer = setTimeout(() => {
            refreshToken();
          }, timeDifference);
        }
      } else {
        // No token expired time, call refreshToken immediately
        refreshToken();
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return <></>;
}

export default AccessTokenRefresher;
