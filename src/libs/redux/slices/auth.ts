import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REDUCER_PATH_AUTH } from '~/constants/redux.ts';
import { User } from '~/types/userTypes';

interface State {
  user: User | null;
  isLoggedIn: boolean;
}

type LoginAction = PayloadAction<Exclude<State['user'], null>>;

const initialState: State = {
  user: null,
  isLoggedIn: false,
};

const slice = createSlice({
  name: REDUCER_PATH_AUTH,
  initialState,
  reducers: {
    login: (state, { payload }: LoginAction) => {
      state.user = payload;
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
