import { types } from "./types";

const initState = {
    value: 0
}

export const counterReducer = (state = initState, action) =>{
    switch(action.type){

        case types.INCREMENT:
            return {...state, value: state.value + action.payload};

        default:
            return state;
    }
};