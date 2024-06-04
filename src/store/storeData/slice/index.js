import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	tradeObj: {},
};

const tradeSlice = createSlice({
	name: 'trade',
	initialState,
	reducers: {
		setSelectedTradeId: (state, action) => {
			state.tradeObj = action.payload;
		}
	},
});

export const { actions: TradeActions } = tradeSlice;

export const { reducer: TradeReducers } = tradeSlice;