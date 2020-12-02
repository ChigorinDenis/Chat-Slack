import { createReducer, createAction } from '@reduxjs/toolkit';

export const toggleChannel = createAction('TOGGLE_CHANNEL');

export default (initialState) => createReducer(initialState, {
  [toggleChannel.type]: (state, { payload }) => {
    state.currentChannelId = payload;
  },
});
