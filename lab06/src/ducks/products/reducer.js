import { types } from './types';

const initState = {
    productsList: [],
    categoriesList: []
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
            return {...state, productsList: [...state.productsList, action.payload]};

        case types.PRODUCT_DELETE_SUCCESS:
            return {...state, productsList: state.productsList.filter(product => `${product.id}` !== `${action.payload.id}`)};

        case types.CATEGORIES_GET_SUCCESS:
            return {...state, categoriesList: action.payload}

        case types.CATEGORY_PRODUCT_GET_REQUEST:
            return {...state, loading: true};

        case types.CATEGORY_PRODUCT_GET_SUCCESS:
            return {...state, productsList: action.payload, loading: false};

        default:
            return state;
    }
}