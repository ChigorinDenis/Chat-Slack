import { createReducer, createAction } from '@reduxjs/toolkit';

export const addMessage = createAction('ADD_MESSAGE');

export default (initialState) => createReducer(initialState, {
  [addMessage.type]: (state, { payload }) => {
    console.log('проверка сокета')
    state.push(payload);
  },
});
