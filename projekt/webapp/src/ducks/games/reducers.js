import { types } from "./types";

const initState = []

export const gamesReducer = (state = initState, action) => {

    switch (action.type) {
        case types.GET_GAMES_SUCCESS:
            return [...action.payload.games];
        case types.POST_GAMES_SUCCESS:
            return [...state, action.payload.game];
        default:
            return state;
    }
}
