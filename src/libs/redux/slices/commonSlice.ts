import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INITIAL_THEME } from '~/constants/commonConstants.ts';
import { REDUCER_PATH_COMMON } from '~/constants/reduxConstants';
import { Device, History, Theme } from '~/types/index.ts';

interface InitialState {
  theme: Theme;
  device: null | Device;
  read: History[];
}
type RemoveReadingHistoryPayload = History['id'] | History['id'][];

const initialState: InitialState = {
  theme: INITIAL_THEME,
  device: null,
  read: [],
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
    addReadingHistory(state, { payload }: PayloadAction<InitialState['read'][number]>) {
      const newRead = state.read.filter((item) => item.id !== payload.id);
      state.read = [payload, ...newRead];
    },
    removeReadingHistory(state, { payload }: PayloadAction<RemoveReadingHistoryPayload>) {
      const ids = Array.isArray(payload) ? payload : [payload];
      state.read = state.read.filter((item) => !ids.includes(item.id));
    },
  },
});

const { reducer: commonReducer, actions } = slice;

export const { setTheme, setDevice, addReadingHistory, removeReadingHistory } = actions;

export type CommonReducerState = InitialState;

export default commonReducer;
