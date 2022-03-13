import { createSelector, createSlice } from '@reduxjs/toolkit';
import { sortBy } from 'ramda';

import defaultTradingSettings from '../constant/defaultTradingSettings';
import sendRequest from '../utils/sendRequest';

const sortTradingPairs = sortBy((tradingPair) => tradingPair.isActive !== true);
const formatOrders = (orders) => {
  const res = [];
  let buyAmount = 0;
  for (let i = 0; i < orders.length; i++) {
    const order = { ...orders[i] };
    order.amount = order.price * order.origQty;
    if (order.side === 'BUY') {
      order.color = 'blue';
      order.type = 'open-position';
      buyAmount += order.amount;
    } else {
      order.profit = order.amount - buyAmount;
      buyAmount = 0;
      if (order.price > orders[i - 1]?.price) {
        order.color = 'green';
        order.type = 'take-profit';
      } else {
        order.color = 'red';
        order.type = 'stop-loss';
      }
    }
    res.push(order);
  }
  return res;
};

const initialState = {
  tradingPairs: {},
  history: undefined,
};

// Reducers
export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setLastTickers: (state, action) => {
      action.payload.forEach((tradingPair) => {
        if (tradingPair.s.match(/USDT$/gi)) {
          state.lastTickers[tradingPair.s] = { q: tradingPair.q * 1, o: tradingPair.o * 1, c: tradingPair.c * 1 };
        }
      });
    },
    updateLastTickers: (state, action) => {
      action.payload.forEach((tradingPair) => {
        if (tradingPair.s.match(/USDT$/gi) && state.tradingPairs[tradingPair.s]) {
          state.tradingPairs[tradingPair.s].q = tradingPair.q * 1;
          state.tradingPairs[tradingPair.s].o = tradingPair.o * 1;
          state.tradingPairs[tradingPair.s].c = tradingPair.c * 1;
        }
      });
    },
    setTradingPairs: (state, action) => {
      state.tradingPairs = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setStrategy: (state, action) => {
      const { symbol } = action.payload;
      delete action.payload.symbol;

      Object.entries(action.payload).forEach(([key, val]) => {
        state.tradingPairs[symbol][key] = val;
      });
    },
  },
});

export const { setLastTickers, setTradingPairs, setStrategy, updateLastTickers, setHistory } = marketSlice.actions;

// Actions
export const initTradingPairs = () => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  const res = await Promise.all([
    sendRequest({ method: 'get', pathname: 'trading-pair' }),
    sendRequest({ method: 'get', pathname: 'strategy/me', token }),
  ]);

  const tradingPairs = res[0].data;
  const tradingPairKeys = Object.keys(tradingPairs);
  tradingPairKeys.forEach((key) => {
    const tradingPair = res[1].data.find((dt) => dt.symbol === key);
    if (tradingPair) {
      tradingPairs[key] = { ...tradingPairs[key], ...tradingPair };
    } else {
      tradingPairs[key] = { ...tradingPairs[key], ...defaultTradingSettings };
    }
  });
  dispatch(setTradingPairs(tradingPairs));
};

export const fetchHistory = (symbol) => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  const res = await sendRequest({ method: 'get', pathname: 'trading-pair/history', token, query: { symbol } });
  res.data.orders = formatOrders(res.data.orders);
  dispatch(setHistory(res.data));
};

export const updateStrategy = (data) => async (dispatch, getState) => {
  const {
    auth: { token },
    market: { tradingPairs },
  } = getState();

  const { isActive, initialAmount, takeProfit, stopLoss, isDCA, entryPoints, advanceSettings, strategy } =
    tradingPairs[data.symbol];
  const res = await sendRequest({
    method: 'post',
    pathname: 'strategy/update',
    data: {
      isActive,
      initialAmount,
      takeProfit,
      stopLoss,
      isDCA,
      entryPoints,
      advanceSettings,
      strategy,
      ...data,
    },
    token,
  });
  dispatch(setStrategy(res.data));
};

// Selectors
export const selectTradingPairs = createSelector(
  (state) => state.market.tradingPairs,
  (tradingPairs) => sortTradingPairs(Object.values(tradingPairs))
);
export const selectHistory = (state) => state.market.history;

export default marketSlice.reducer;
