import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer'
import adminReducer from './reducers/adminReducer'
import cardReducer from './reducers/cardReducer'
import designerReducer from './reducers/designerReducer'
import braceletReducer from './reducers/braceletReducer'
import giftcardReducer from './reducers/giftcardReducer'
import orderReducer from './reducers/orderReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    card: cardReducer,
    designer: designerReducer,
    bracelet: braceletReducer,
    giftcard: giftcardReducer,
    order: orderReducer
  },
});
