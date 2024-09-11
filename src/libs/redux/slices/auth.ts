import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REDUCER_PATH_AUTH } from '~/constants/redux.ts';

export interface State {
  user: null | {
    id: string;
    name: string;
    email: string;
  };
  isLoggedIn: boolean;
}

const initialState: State = {
  user: null,
  isLoggedIn: false,
};

type LoginAction = PayloadAction<Exclude<State['user'], null>>;

const slice = createSlice({
  name: REDUCER_PATH_AUTH,
  initialState,
  reducers: {
    login: (state, action: LoginAction) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

const { reducer: authReducer, actions } = slice;

export const { login, logout } = actions;

export default authReducer;
