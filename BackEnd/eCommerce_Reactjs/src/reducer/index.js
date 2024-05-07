import shopCartReducer from './shopCartReducer'
import { combineReducers } from 'redux'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};
const shopcartPersistConfig = {
    ...persistCommonConfig,
    key: 'shopcart',
    whitelist: ['listCartItem']
};
const rootReducer = combineReducers({
    shopcart: persistReducer(shopcartPersistConfig, shopCartReducer),

});

export default rootReducer