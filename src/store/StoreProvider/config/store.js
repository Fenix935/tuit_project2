import { configureStore } from '@reduxjs/toolkit';
import {tradeApi} from "../../../api/apiService";
import {TradeReducers} from "../../storeData/slice";


const RTKApiMiddlewares = [
    tradeApi.middleware
];

export function createReduxStore(initialState) {
    const rootReducers = {
        trade: TradeReducers,
        [tradeApi.reducerPath]: tradeApi.reducer
    };

    return configureStore({
        reducer: rootReducers,
        devTools: true,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(RTKApiMiddlewares),
    });
}
