import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timeServer: undefined,
};

// Reducers
export const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    setTimeServer: (state, action) => {
      state.timeServer = action.payload;
    },
  },
});

export const { setTimeServer } = metaSlice.actions;

// Actions

// Selectors
export const selectTimeServer = (state) => state.meta.timeServer;

export default metaSlice.reducer;
