import { types } from "./types";

export const updateOffersList = (game_id, new_offer_id) => {
    console.log("///////////")
    console.log({
        type: types.UPDATE_OFFERS_LIST,
        meta: { actionType: 'EDIT' },
        payload: {
            game_id,
            new_offer_id
        }
    })
    return {
        type: types.UPDATE_OFFERS_LIST,
        meta: { actionType: 'EDIT' },
        payload: {
            game_id,
            new_offer_id
        }
    }
}