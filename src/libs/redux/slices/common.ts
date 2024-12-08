import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REDUCER_PATH_COMMON } from '~/constants/reduxConstants';
import { Device } from '~/types/commonTypes.ts';

interface InitialState {
  theme: 'light' | 'dark';
  device: null | Device;
}

const initialState: InitialState = {
  theme: 'light',
  device: null,
};

const slice = createSlice({
  name: REDUCER_PATH_COMMON,
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<InitialState['theme']>) {
      state.theme = payload;
    },
    changeDevice(state, { payload }: PayloadAction<InitialState['device']>) {
      state.device = payload;
    },
  },
});

const { reducer: commonReducer, actions } = slice;

export const { setTheme, changeDevice } = actions;

export default commonReducer;
