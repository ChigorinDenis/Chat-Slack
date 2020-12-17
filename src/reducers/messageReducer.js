import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelReducer';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload }) {
      state.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload }) => {
        const { id } = payload;
        const filtered = state
          .filter((item) => item.channelId !== id);
        return filtered;
      });
  },
});

export const { addMessage, removeMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
