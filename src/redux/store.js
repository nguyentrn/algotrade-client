import { configureStore } from '@reduxjs/toolkit';

import metaSlice from './metaSlice';
import authSlice from './authSlice';
import marketSlice from './marketSlice';
import accountSlice from './accountSlice';

export default configureStore({
  reducer: {
    meta: metaSlice,
    auth: authSlice,
    market: marketSlice,
    account: accountSlice,
  },
});
