import { createStore, applyMiddleware, compose } from 'redux'
import { logger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import rootReducer from '../reducer'
import { SHOP_CART } from '../utils/constant';
import { persistStore } from 'redux-persist';
import { createStateSyncMiddleware } from 'redux-state-sync';
const environment = process.env.NODE_ENV || "development";
let isDevelopment = environment === "development";


isDevelopment = false;

const reduxStateSyncConfig = {
    whitelist: [
        SHOP_CART.GET_ITEM_CART_SUCCESS,


    ]
}

const middleware = [
    thunkMiddleware,
    createStateSyncMiddleware(reduxStateSyncConfig),
]
if (isDevelopment) middleware.push(logger);

const composeEnhancers = (isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

export const dispatch = store.dispatch;
export const persistor = persistStore(store);
export default store;
