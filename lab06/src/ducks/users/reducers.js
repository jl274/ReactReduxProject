import { types } from "./types";

const initState = {
    usersList: []
};

export const usersReducer = (state = initState, action) => {

    switch (action.type){

        case types.USER_GET_REQUEST:
            return {...state, loading: true};

        case types.USER_GET_SUCCESS:
            return {...state, usersList: action.payload};

        case types.USER_GET_FAILURE:
            return state;

        default:
            return state;
    }
}