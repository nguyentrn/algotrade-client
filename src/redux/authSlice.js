import { createSlice } from '@reduxjs/toolkit';

import sendRequest from '../utils/sendRequest';
import { setAccount } from './accountSlice';

const initialState = {
  api_key: undefined,
  secret_key: undefined,
  token: undefined,
  isLoading: false,
};

// Reducers
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAPIKey: (state, action) => {
      state.secret_key = action.payload.secret_key;
      state.api_key = action.payload.api_key;
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
export const login = () => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  const res = await sendRequest({ method: 'get', pathname: 'auth/login', token });
  dispatch(setAccount(res.data));
};

// Selectors
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
