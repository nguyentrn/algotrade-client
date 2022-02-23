import { createSlice } from '@reduxjs/toolkit';
import sendRequest from '../utils/sendRequest';

const initialState = {
  balances: {},
  orders: undefined,
};

// Reducers
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setApiEnabled: (state, action) => {
      state.isApiEnabled = action.payload;
    },
    setBalances: (state, action) => {
      state.balances = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setAccount: (state, action) => {
      state.fuel = action.payload.fuel;
      state.role = action.payload.role;
      state.active_exchange = action.payload.active_exchange;
      state.email = action.payload.email;
    },
  },
});

export const { setAccount, setApiEnabled, setBalances, setOrders } = accountSlice.actions;

// Actions
export const checkApiEnabled = () => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  const res = await sendRequest({ method: 'get', pathname: 'account/checkapi', token });
  dispatch(setApiEnabled(res.data));
};

export const getBalances = () => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  const res = await sendRequest({ method: 'get', pathname: 'account/balances', token });
  dispatch(setBalances(res.data));
};

export const getAccount = () => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  const res = await sendRequest({ method: 'get', pathname: 'auth/check', token });
  console.log(res);
  dispatch(setAccount(res.data));
};

export const getOrders = (symbol) => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  const res = await sendRequest({ method: 'get', pathname: 'trading-pair/orders', token, query: { symbol } });

  dispatch(setOrders(res.data));
};

// Selectors
export const selectIsApiEnabled = (state) => state.account.isApiEnabled;
export const selectBalances = (state) => state.account.balances;
export const selectOrders = (state) => state.account.orders;
export const selectFuel = (state) => state.account.fuel;

export default accountSlice.reducer;
