export const typeAddMovie = 'ADD_MOVIE';
export const typeDeleteMovie = 'DELETE_MOVIE';

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