import { createAction } from 'redux-api-middleware';
import { types } from './types';

export const getCartsOperation = () => {
    return createAction({
        endpoint: `https://fakestoreapi.com/carts`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        types: [
            types.CARTS_GET_REQUEST,
            types.CARTS_GET_SUCCESS,
            types.CARTS_GET_FAILURE
        ]
    })
}

export const getOneCartOperation = (id) => {
    return createAction({
        endpoint: `https://fakestoreapi.com/carts/${id}`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        types: [
            types.ONE_CART_GET_REQUEST,
            types.ONE_CART_GET_SUCCESS,
            types.ONE_CART_GET_FAILURE
        ]
    })
}