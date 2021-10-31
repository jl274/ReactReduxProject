export const typeAddDirector = 'ADD_DIRECTOR';

export const addDirector = (id, payload) => {
    return {
        type: typeAddDirector,
        payload: {
            id,
            ...payload
        }
    }
}