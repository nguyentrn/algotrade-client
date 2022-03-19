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
    setPermissions: (state, action) => {
      state.permissions = action.payload;
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

export const { setAccount, setPermissions, setBalances, setOrders } = accountSlice.actions;

// Actions
export const fetchAccount = () => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  const res = await sendRequest({ method: 'get', pathname: 'account/me', token });
  console.log(res);
  if (res.data) {
    dispatch(setBalances(res.data.balances));
    dispatch(setPermissions(res.data.permissions));
  }
};

export const getOrders = (symbol) => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  const res = await sendRequest({ method: 'get', pathname: 'trading-pair/orders', token, query: { symbol } });
  dispatch(setOrders(res.data));
};

// Selectors
export const selectPermissions = (state) => state.account.permissions;
export const selectBalances = (state) => state.account.balances;
export const selectOrders = (state) => state.account.orders;
export const selectFuel = (state) => state.account.fuel;

export default accountSlice.reducer;
