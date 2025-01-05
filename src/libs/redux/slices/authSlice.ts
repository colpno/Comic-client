import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REDUCER_PATH_AUTH } from '~/constants/reduxConstants';
import { User } from '~/types/userTypes';

interface State {
  user: Pick<User, 'id'> | null;
  isLoggedIn: boolean;
}

type LoginAction = PayloadAction<Exclude<State['user'], null>>;

const initialState: State = {
  user: null,
  isLoggedIn: import.meta.env.DEV,
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

export type AuthReducerState = State;

export default authReducer;
