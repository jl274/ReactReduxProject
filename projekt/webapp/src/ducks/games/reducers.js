import { types } from "./types";

const initState = []

export const gamesReducer = (state = initState, action) => {

    switch (action.type) {
        case types.GET_GAMES_SUCCESS:
            return [...action.payload.games];
        default:
            return state;
    }
}
