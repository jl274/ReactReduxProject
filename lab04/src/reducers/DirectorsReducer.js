import { typeAddDirector } from "../actions/directorsActions";

const initState = {
    list: []
}

const directorsReducer = (state = initState, action) => {
    switch(action.type){

        case typeAddDirector:
            return {...state, list: [...state.list, action.payload]};

        default:
            return state;
    }
}

export default directorsReducer;