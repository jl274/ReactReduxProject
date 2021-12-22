import { types } from './types';

const initState = [{id: 0, title: "Monopoly", name: "Andrzej", surname: "Kowalski"}];

export const packReducer = (store=initState, action) => {

    switch(action.type){

        case types.ADD:
            return [...store, action.payload];

        default:
            return store;
    }
}