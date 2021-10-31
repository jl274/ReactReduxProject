export const typeAddMovie = 'ADD_MOVIE';

export const addMovie = (id, payload) => {
    return {
        type: typeAddMovie,
        payload: {
            id,
            ...payload
        }
    }
}