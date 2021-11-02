import { typeAddMovie, typeDeleteMovie } from "../actions/movieActions";

const initState = {
    list: []
}

const movieReducer = (state = initState, action) => {

    switch(action.type){

        case typeAddMovie:
            return {...state, list: [...state.list, action.payload]};

        case typeDeleteMovie:
            return {...state, list: state.list.filter(x => x.id !== action.payload)}

        default:
            return state;
    }
}

export default movieReducer;