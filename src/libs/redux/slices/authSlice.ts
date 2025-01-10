import { createSlice } from '@reduxjs/toolkit';

import { REDUCER_PATH_AUTH } from '~/constants/reduxConstants';

interface State {
  isLoggedIn: boolean;
}

const initialState: State = {
  isLoggedIn: import.meta.env.DEV,
};

const slice = createSlice({
  name: REDUCER_PATH_AUTH,
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

const { reducer: authReducer, actions } = slice;

export const { login, logout } = actions;

export type AuthReducerState = State;

export default authReducer;
