import { types } from './types';

export const addNewPack = (id, packInfo) => {
    return {
        type: types.ADD,
        payload: {id, ...packInfo}
    }
}

export const deletePack = (id) => {
    return{
        type: types.DELETE,
        payload: id
    }
}