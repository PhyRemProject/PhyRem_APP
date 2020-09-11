import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import UserReducer from "../User/UserReducer"

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    UserReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(

    persistedReducer,

    // "Thunk" is a middleware that provides async actions
    applyMiddleware(thunk)
);

let persistor = persistStore(store);
let Store = { store, persistor }

export default Store;