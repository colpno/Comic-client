import { createSlice } from '@reduxjs/toolkit';

import { REDUCER_PATH_COMMON } from '~/constants/redux.ts';

interface InitialState {
  theme: 'light' | 'dark';
}

const initialState: InitialState = {
  theme: 'light',
};

const slice = createSlice({
  name: REDUCER_PATH_COMMON,
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

const { reducer: commonReducer, actions } = slice;

export const { toggleTheme } = actions;

export default commonReducer;
