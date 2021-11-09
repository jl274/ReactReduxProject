export const typeAddActor = 'ADD_ACTOR';

export const addActor = (payload) => {
    return {
        type: typeAddActor,
        payload
    }
};