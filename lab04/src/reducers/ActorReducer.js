import { typeAddActor } from '../actions/actorActions'

const initState = {
    list: []
}

const actorReducer = (state=initState, action) => {

    switch (action.type){

        case typeAddActor:
            return {...state, list: [state.list, ...action.payload]}

        default:
            return state
    }
}

export default actorReducer;