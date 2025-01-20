import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REDUCER_PATH_AUTH } from '~/constants/reduxConstants';

interface State {
  accessToken: string | undefined;
  isLoggedIn: boolean;
}

const initialState: State = {
  accessToken: undefined,
  isLoggedIn: import.meta.env.DEV,
};

const slice = createSlice({
  name: REDUCER_PATH_AUTH,
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<State['accessToken']>) => {
      state.accessToken = payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.accessToken = initialState.accessToken;
      state.isLoggedIn = false;
    },
  },
});

const { reducer: authReducer, actions } = slice;

export const { login, logout } = actions;

export type AuthReducerState = State;

export default authReducer;
