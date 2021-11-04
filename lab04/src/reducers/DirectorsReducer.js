import { typeAddDirector, typeEditDirector } from "../actions/directorsActions";

const initState = {
    list: []
}

const directorsReducer = (state = initState, action) => {
    switch(action.type){

        case typeAddDirector:
            return {...state, list: [...state.list, action.payload]};

        case typeEditDirector:
            return {...state, list: state.list.map(director => {
                if (director.id === action.payload.id){
                    return action.payload
                } else {
                    return director
                }
            })};

        default:
            return state;
    }
}

export default directorsReducer;