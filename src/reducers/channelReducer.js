import { createReducer, createAction } from '@reduxjs/toolkit';

export const addChannel = createAction('ADD_CHANNEL');
export const renameChannel = createAction('RENAME_CHANNEL');
export const removeChannel = createAction('REMOVE_CHANNEL');

export default (initialState) => createReducer(initialState, {
  [addChannel.type]: (state, { payload }) => {
    state.push(payload);
  },
  [renameChannel.type]: (state, { payload }) => {
    const { id, name } = payload;
    const channel = state
      .find((item) => item.id === id);
    channel.name = name;
  },
  [removeChannel.type]: (state, { payload }) => {
    const { id } = payload;
    const filtered = state.filter((item) => item.id !== id);
    return filtered;
  },
});
