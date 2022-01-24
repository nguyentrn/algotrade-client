import { createSlice } from '@reduxjs/toolkit';

import sendRequest from '../utils/sendRequest';

const initialState = {
  apiKey: undefined,
  secret: undefined,
  token: undefined,
  isLoading: false,
};

// Reducers
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAPIKey: (state, action) => {
      state.secret = action.payload.secret;
      state.apiKey = action.payload.apiKey;
    },
    toggleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken, setAPIKey, toggleLoading } = authSlice.actions;

// Actions
export const getUser = (token) => async (dispatch) => {
  const res = await sendRequest({ pathname: 'auth/check', token });
  if (res.data) {
    const { binance_api_key: apiKey, binance_secret_key: secret } = res.data;
    dispatch(
      setAPIKey({
        apiKey,
        secret,
      })
    );
  }
};

// Selectors

export default authSlice.reducer;
