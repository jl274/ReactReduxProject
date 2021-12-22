import { types } from './types';

const initState = [{id: 0, title: "Monopoly", name: "Andrzej Kowalski", extended: false}];

export const packReducer = (store=initState, action) => {

    switch(action.type){

        case types.ADD:
            return [...store, action.payload];

        case types.DELETE:
            return store.filter(x => x.id !== action.payload);

        default:
            return store;
    }
}