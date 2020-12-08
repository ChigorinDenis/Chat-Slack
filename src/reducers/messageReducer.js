import { createReducer, createAction } from '@reduxjs/toolkit';

export const addMessage = createAction('ADD_MESSAGE');
export const removeMessages = createAction('REMOVE_MESSAGES');

export default (initialState) => createReducer(initialState, {
  [addMessage.type]: (state, { payload }) => {
    state.push(payload);
  },
  [removeMessages.type]: (state, { payload }) => {
    const { id } = payload;
    const filtered = state
      .filter((item) => item.channelId !== id);
    return filtered;
  },
});
