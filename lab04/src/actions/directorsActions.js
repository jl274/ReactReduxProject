export const typeAddDirector = 'ADD_DIRECTOR';
export const typeEditDirector = 'EDIT_DIRECTOR';

export const addDirector = (id, payload) => {
    return {
        type: typeAddDirector,
        payload: {
            id,
            ...payload
        }
    }
}

export const editDirector = (id, payload) => {
    return {
        type: typeEditDirector,
        payload: {
            id,
            ...payload
        }
    }
}