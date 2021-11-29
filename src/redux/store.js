import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer'
import adminReducer from './reducers/adminReducer'
import cardReducer from './reducers/cardReducer'
import designerReducer from './reducers/designerReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    card: cardReducer,
    designer: designerReducer
  },
});
