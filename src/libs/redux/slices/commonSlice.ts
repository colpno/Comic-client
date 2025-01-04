import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INITIAL_THEME } from '~/constants/commonConstants.ts';
import { REDUCER_PATH_COMMON } from '~/constants/reduxConstants';
import { Device, Theme } from '~/types/commonTypes.ts';

interface InitialState {
  theme: Theme;
  device: null | Device;
}

const initialState: InitialState = {
  theme: INITIAL_THEME,
  device: null,
};

const slice = createSlice({
  name: REDUCER_PATH_COMMON,
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<InitialState['theme']>) {
      state.theme = payload;
    },
    setDevice(state, { payload }: PayloadAction<InitialState['device']>) {
      state.device = payload;
    },
  },
});

const { reducer: commonReducer, actions } = slice;

export const { setTheme, setDevice } = actions;

export type CommonReducerState = InitialState;

export default commonReducer;
