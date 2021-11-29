import { types } from "./types";

const initState = {
    cartsList: []
}

export const cartReducer = (state=initState, action) => {
    switch(action.type){

        case types.CARTS_GET_SUCCESS:
            return {...state, cartsList: action.payload}

        default:
            return state;
    }
}