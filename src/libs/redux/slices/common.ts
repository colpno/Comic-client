import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REDUCER_PATH_COMMON } from '~/constants/reduxConstants';

interface InitialState {
  theme: 'light' | 'dark';
}

type SetThemeAction = PayloadAction<InitialState['theme']>;

const initialState: InitialState = {
  theme: 'light',
};

const slice = createSlice({
  name: REDUCER_PATH_COMMON,
  initialState,
  reducers: {
    setTheme(state, { payload }: SetThemeAction) {
      state.theme = payload;
    },
  },
});

const { reducer: commonReducer, actions } = slice;

export const { setTheme } = actions;

export default commonReducer;
