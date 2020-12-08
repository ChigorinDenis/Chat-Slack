import { createReducer, createAction } from '@reduxjs/toolkit';

export const openModal = createAction('OPEN_MODAL');
export const closeModal = createAction('CLOSE_MODAL');

const initialState = {
  isOpen: false,
  modalName: null,
  data: {},
}

export default (createReducer(initialState, {
  [openModal.type]: (state, { payload }) => {
    state.modalName = payload.modalName;
    state.isOpen = true;
    state.data = payload.data || {};
  },
  [closeModal.type]: (state) => {
    state.modalName = null;
    state.isOpen = false;
    state.data = {};
  },
}));