import { typeAddActor, typeAddMovieToActor, typeDeleteMovieFromActor } from '../actions/actorActions'

const initState = {
    list: []
}

const actorReducer = (state=initState, action) => {

    switch (action.type){

        case typeAddActor:
            return {...state, list: [...state.list, action.payload]}

        case typeDeleteMovieFromActor:
            return {...state, list: state.list.map(actor => {
                if (actor.id === action.payload.id) {
    
                    actor.movies = actor.movies.filter(x => x !== action.payload.movie);
    
                }
                return actor
            })}
        
        case typeAddMovieToActor:
            return {...state, list: state.list.map(actor => {
                if (actor.id === action.payload.id) {
                    if (!actor.movies.includes(action.payload.movie)){
                        actor.movies.push(
                            action.payload.movie
                        )
                    }
                }
                return actor
            })}

        default:
            return state
    }
}

export default actorReducer;