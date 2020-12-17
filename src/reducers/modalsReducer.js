import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  modalName: null,
  data: {},
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      return {
        modalName: payload.modalName,
        isOpen: true,
        data: payload.data || {},
      };
    },
    closeModal() {
      return {
        modalName: null,
        isOpen: false,
        data: {},
      };
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
