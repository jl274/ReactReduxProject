import { types } from "./types";

export const incrementAction = () => {
    return {
        type: types.INCREMENT,
        payload: 1
    }
};

export const decrementAction = () => {
    return {
        type: types.DECREMENT,
        payload: 1
    }
}

export const setIntervalIdAction = (id) => {
    return {
        type: types.SET_INTERVAL_ID,
        payload: id
    }
}