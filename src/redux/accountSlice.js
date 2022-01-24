import { createSelector, createSlice } from '@reduxjs/toolkit';
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
    setApiExpired: (state, action) => {
      state.isApiExpired = action.payload;
    },
    setBalances: (state, action) => {
      state.balances = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setApiExpired, setBalances, setOrders } = accountSlice.actions;

// Actions
export const checkApiExpired = () => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  const res = await sendRequest({ method: 'get', pathname: 'account/checkapi', token });
  dispatch(setApiExpired(!res.data));
};

export const getBalances = () => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  const res = await sendRequest({ method: 'get', pathname: 'account/balances', token });
  dispatch(setBalances(res.data));
};

export const getOrders = (symbol) => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  const res = await sendRequest({ method: 'get', pathname: 'trading-pair/orders', token, query: { symbol } });

  dispatch(setOrders(res.data));
};

// Selectors
export const selectIsApiExpired = (state) => state.account.isApiExpired;
export const selectBalances = (state) => state.account.balances;
export const selectOrders = (state) => state.account.orders;

export default accountSlice.reducer;
