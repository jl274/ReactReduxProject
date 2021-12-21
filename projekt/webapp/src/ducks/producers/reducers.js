import { types } from "./types";

const initState = []

export const producerReducer = (state = initState, action) => {

    switch (action.type) {
        case types.GET_PRODUCERS_SUCCESS:
            return [...action.payload.producers];
        default:
            return state;
    }
}