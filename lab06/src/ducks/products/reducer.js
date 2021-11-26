import { types } from './types';

const initState = {
    productsList: []
}

export const productsReducer = (state = initState, action) => {

    switch (action.type) {

        case types.PRODUCTS_GET_REQUEST:
            return {...state, loading: true};

        case types.PRODUCTS_GET_SUCCESS:
            return {...state, productsList: action.payload, loading: false};

        case types.PRODUCTS_GET_FAILURE:
            return {...state, loading: false};

        case types.PRODUCTS_POST_SUCCESS:
            return {...state, productsList: [...state.productsList, action.payload]}

        default:
            return state;
    }
}