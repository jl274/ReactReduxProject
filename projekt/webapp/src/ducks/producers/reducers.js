import { types } from "./types";

const initState = []

export const producerReducer = (state = initState, action) => {

    switch (action.type) {
        case types.GET_PRODUCERS_SUCCESS:
            return [...action.payload.producers];
        case types.EDIT_GAMES_SUCCESS:
            return state.map(producer => {
                if (producer.id === action.payload.producer.id){
                    return action.payload.producer
                }
                return producer
            })
        default:
            return state;
    }
}