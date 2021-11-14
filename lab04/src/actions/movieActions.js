export const typeAddMovie = 'ADD_MOVIE';
export const typeDeleteMovie = 'DELETE_MOVIE';
export const typeAddActorToMovie = 'ADD_ACTOR_TO_MOVIE';
export const typeDeleteActorFromMovie = 'DELETE_ACTOR_FROM_MOVIE';

export const addMovie = (id, payload) => {
    return {
        type: typeAddMovie,
        payload: {
            id,
            ...payload,
            actors: []
        }
    }
}

export const deleteMovie = (id) => {
    return {
        type: typeDeleteMovie,
        payload: id
    }
}

export const addActorToMovie = (id, actorId) => {
    return {
        type: typeAddActorToMovie,
        payload: {
            id,
            actorId
        }
    }
}

export const deleteActorFromMovie = (id, actorId) => {
    return {
        type: typeDeleteActorFromMovie,
        payload:{
            id,
            actorId
        }
    }
}