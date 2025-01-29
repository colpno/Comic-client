import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REDUCER_PATH_AUTH } from '~/constants/reduxConstants';

interface State {
  accessToken: string | null;
  /** In ISO format. */
  tokenExpiredTime: string | null;
  isLoggedIn: boolean;
}

type LoginPayload = PayloadAction<Pick<State, 'accessToken' | 'tokenExpiredTime'>>;

const initialState: State = {
  accessToken: null,
  tokenExpiredTime: null,
  isLoggedIn: import.meta.env.DEV,
};

const slice = createSlice({
  name: REDUCER_PATH_AUTH,
  initialState,
  reducers: {
    login: (state, { payload }: LoginPayload) => {
      state.accessToken = payload.accessToken;
      state.tokenExpiredTime = payload.tokenExpiredTime;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.accessToken = initialState.accessToken;
      state.isLoggedIn = false;
    },
    setAccessToken: (state, { payload }: PayloadAction<State['accessToken']>) => {
      state.accessToken = payload;
    },
  },
});

const { reducer: authReducer, actions } = slice;

export const { login, logout, setAccessToken } = actions;

export type AuthReducerState = State;

export default authReducer;
