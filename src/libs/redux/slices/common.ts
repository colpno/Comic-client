import { createSlice } from '@reduxjs/toolkit';

import { REDUCER_PATH_COMMON } from '~/constants/redux.ts';

interface InitialState {
  activeApiCalls: number;
}

const initialState: InitialState = {
  activeApiCalls: 0,
};

const slice = createSlice({
  name: REDUCER_PATH_COMMON,
  initialState,
  reducers: {
    increaseActiveApiCalls: (state) => {
      state.activeApiCalls += 1;
    },
    decreaseActiveApiCalls: (state) => {
      state.activeApiCalls -= 1;
    },
  },
});

const { reducer: commonReducer, actions } = slice;

export const { increaseActiveApiCalls, decreaseActiveApiCalls } = actions;

export default commonReducer;
