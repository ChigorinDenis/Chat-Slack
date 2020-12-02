import { createReducer, createAction } from '@reduxjs/toolkit';

export const addChannel = createAction('ADD_CHANNEL');

export default (initialState) => createReducer(initialState, {
  [addChannel.type]: (state, { payload }) => {
    state.push(payload);
  },
});
