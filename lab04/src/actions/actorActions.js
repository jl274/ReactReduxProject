export const typeAddActor = 'ADD_ACTOR';
export const typeAddMovieToActor = 'ADD_MOVIE_TO_ACTOR';

export const addActor = (payload) => {
    return {
        type: typeAddActor,
        payload: {
            ...payload,
            movies: []
        }
    }
};

export const addMovieToActor = (id, movie) => {
    return {
        type: typeAddMovieToActor,
        payload: {
            id,
            movie
        }
    }
};