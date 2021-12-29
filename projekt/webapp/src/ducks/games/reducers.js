import { types } from "./types";

const initState = []

export const gamesReducer = (state = initState, action) => {

    switch (action.type) {
        case types.GET_GAMES_SUCCESS:
            return [...action.payload.games];
        case types.POST_GAMES_SUCCESS:
            return [...state, action.payload.game];
        case types.UPDATE_OFFERS_LIST:
            console.log("-----")
            console.log(state.map(game => {
                if (game.id === action.payload.game_id){
                    game.offers.push(action.payload.new_offer_id);
                }
                return game
            }))
            return state.map(game => {
                if (game.id === action.payload.game_id){
                    game.offers.push(action.payload.new_offer_id);
                }
                return game
            })
        default:
            return state;
    }
}
