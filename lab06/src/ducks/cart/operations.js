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

export const updateCart = (cartId, update) => {
    // console.log(cartId, update)
    return createAction({
        endpoint: `https://fakestoreapi.com/carts/${cartId}`,
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(update),
        types: [
            types.ADD_TO_CART_REQUEST,
            types.ADD_TO_CART_SUCCESS,
            types.ADD_TO_CART_FAILURE
        ]
    })
}

export const newCart = (payload) => {
    return createAction({
        endpoint: `https://fakestoreapi.com/carts`,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload),
        types: [
            types.NEW_CART_REQUEST,
            types.NEW_CART_SUCCESS,
            types.NEW_CART_FAILURE
        ]
    })
}

export const deleteCart = (id) => {
    return createAction({
        endpoint: `https://fakestoreapi.com/carts/${id}`,
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
        types: [
            types.DELETE_CART_REQUEST,
            types.DELETE_CART_SUCCESS,
            types.DELETE_CART_FAILURE
        ]
    })
}