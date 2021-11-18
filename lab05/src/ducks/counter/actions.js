import { types } from "./types";

export const incrementAction = () => {
    return {
        type: types.INCREMENT,
        payload: 1
    }
};