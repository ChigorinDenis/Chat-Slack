import { createReducer, createAction } from '@reduxjs/toolkit';

export const openModal = createAction('OPEN_MODAL');
export const closeModal = createAction('CLOSE_MODAL');

const initialState = {
  isOpen: false,
  modalName: null,
  data: {},
};

export default (createReducer(initialState, {
  [openModal.type]: (state, { payload }) => ({
    modalName: payload.modalName,
    isOpen: true,
    data: payload.data || {},
  }),
  [closeModal.type]: () => ({
    modalName: null,
    isOpen: false,
    data: {},
  }),
}));
