import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE} from "../consts";

export const tradeApi = createApi({
	reducerPath: 'tradeApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_BASE}/api/v1`,
	}),
	endpoints: (build) => ({
		getTradeList: build.query({
			query: (params) => ({
				url: '/trade-list',
				method: 'GET',
				params,
			}),
		}),
		getTradeTable: build.query({
			query: (params) => ({
				url: '/trade-table',
				method: 'GET',
				params,
			}),
		}),
		getTradePassport: build.query({
			query: (params) => ({
				url: '/trade-passport',
				method: 'GET',
				params,
			}),
		}),
		getTradeFile: build.query({
			query: (params) => ({
				url: '/trade-file',
				method: 'GET',
				params,
			}),
		}),
	}),
});