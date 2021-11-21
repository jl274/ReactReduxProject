import { types } from "./types";

const initState = {
    value: 0,
    intervalId: null
}

export const counterReducer = (state = initState, action) =>{
    switch(action.type){

        case types.INCREMENT:
            return {...state, value: state.value + action.payload};

        case types.DECREMENT:
            return {...state, value: state.value - action.payload};

        case types.SET_INTERVAL_ID:
            return {...state, intervalId: action.payload};

        default:
            return state;
    }
};