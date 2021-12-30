import { createAction } from 'redux-api-middleware';
import { types } from "./types";


export const getAllCurrencies = () => {
    return createAction({
        endpoint: "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/pln.json",
        method: "GET",
        types: [
            types.GET_CURRENCIES_REQUEST,
            types.GET_CURRENCIES_SUCCESS,
            types.GET_CURRENCIES_FAILURE
        ]
    })
}