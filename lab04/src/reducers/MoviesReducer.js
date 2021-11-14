import { typeAddMovie, typeDeleteMovie, typeAddActorToMovie, typeDeleteActorFromMovie } from "../actions/movieActions";

const initState = {
    list: []
}

const movieReducer = (state = initState, action) => {

    switch(action.type){

        case typeAddMovie:
            return {...state, list: [...state.list, action.payload]};

        case typeDeleteMovie:
            return {...state, list: state.list.filter(x => x.id !== action.payload)};

        case typeDeleteActorFromMovie:
            return {...state, list: state.list.map(movie => {
                if (movie.id === action.payload.id) {
    
                    movie.actors = movie.actors.filter(x => x !== action.payload.actorId);
    
                }
                return movie
            })}

        case typeAddActorToMovie:
            return {...state, list: state.list.map(movie => {
                if (movie.id === action.payload.id) {
                    if (!movie.actors.includes(action.payload.actorId)){
                        movie.actors.push(
                            action.payload.actorId
                        )
                    }
                }
                return movie
            })}

        default:
            return state;
    }
}

export default movieReducer;