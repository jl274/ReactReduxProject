import { types } from "./types";

export const currencyReducer = (state = {}, action) => {
    switch (action.type){

        case types.GET_CURRENCIES_SUCCESS:
            return action.payload.pln

        default:
            return state;
    }
}