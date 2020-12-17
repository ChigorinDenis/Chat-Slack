import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, { payload }) {
      state.push(payload);
    },
    renameChannel(state, { payload }) {
      const { id, name } = payload;
      const channel = state
        .find((item) => item.id === id);
      channel.name = name;
    },
    removeChannel(state, { payload }) {
      const { id } = payload;
      const filtered = state.filter((item) => item.id !== id);
      return filtered;
    },
  },
});

export const { addChannel, renameChannel, removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
