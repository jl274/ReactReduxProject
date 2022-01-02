import { types } from "./types";

const initState = []

export const offersReducer = (state = initState, action) => {

    switch (action.type) {
        case types.GET_OFFERS_SUCCESS:
            return [...action.payload.offers];
        case types.POST_OFFERS_SUCCESS:
            return [...state, action.payload.offer]
        case types.DELETE_OFFERS_SUCCESS:
            return state.filter(x => x.id !== action.payload.id);
        default:
            return state;
    }
}