import { createAction } from 'redux-api-middleware'
import { types } from './types'

export const getProductsOperation = () => {
    return createAction({
        endpoint: "https://fakestoreapi.com/products",
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        types: [
            types.PRODUCTS_GET_REQUEST,
            types.PRODUCTS_GET_SUCCESS,
            types.PRODUCTS_GET_FAILURE
        ]
    })
}

export const postNewProductOperation = (newProduct) => {
    return createAction({
        endpoint: "https://fakestoreapi.com/products",
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newProduct),
        types: [
            types.PRODUCTS_POST_REQUEST,
            types.PRODUCTS_POST_SUCCESS,
            types.PRODUCTS_POST_FAILURE
        ]
    })
}