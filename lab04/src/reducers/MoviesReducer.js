import { typeAddMovie, typeDeleteMovie, typeAddActorToMovie } from "../actions/movieActions";

const initState = {
    list: []
}

const movieReducer = (state = initState, action) => {

    switch(action.type){

        case typeAddMovie:
            return {...state, list: [...state.list, action.payload]};

        case typeDeleteMovie:
            return {...state, list: state.list.filter(x => x.id !== action.payload)};

        case typeAddActorToMovie:
            return {...state, list: state.list.map(movie => {
                if (movie.id === action.payload.id) {
                    movie.actors.push(
                        action.payload.actorId
                    )
                }
                return movie
            })}

        default:
            return state;
    }
}

export default movieReducer;