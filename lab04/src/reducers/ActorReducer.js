import { typeAddActor, typeAddMovieToActor } from '../actions/actorActions'

const initState = {
    list: []
}

const actorReducer = (state=initState, action) => {

    switch (action.type){

        case typeAddActor:
            return {...state, list: [...state.list, action.payload]}
        
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