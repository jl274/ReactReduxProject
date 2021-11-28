import { createAction } from 'redux-api-middleware'
import { types } from './types'

export const getProductsOperation = (order = "asc") => {
    return createAction({
        endpoint: `https://fakestoreapi.com/products?sort=${order}`,
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

export const deleteProductOperation = (id) => {
    return createAction({
        endpoint: `https://fakestoreapi.com/products/${id}`,
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
        types: [
            types.PRODUCT_DELETE_REQUEST,
            types.PRODUCT_DELETE_SUCCESS,
            types.PRODUCT_DELETE_FAILURE
        ]
    })
}

export const getCategoriesOperation = () => {
    return createAction({
        endpoint: "https://fakestoreapi.com/products/categories",
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        types: [
            types.CATEGORIES_GET_REQUEST,
            types.CATEGORIES_GET_SUCCESS,
            types.CATEGORIES_GET_FAILURE
        ]
    })
}

export const getInCategoryOperation = (category) => {
    return createAction({
        endpoint: `https://fakestoreapi.com/products/category/${category}`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        types: [
            types.CATEGORY_PRODUCT_GET_REQUEST,
            types.CATEGORY_PRODUCT_GET_SUCCESS,
            types.CATEGORY_PRODUCT_GET_FAILURE
        ]
    })
}

export const getOneProduct = (id) => {
    return createAction({
        endpoint: `https://fakestoreapi.com/products/${id}`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        types: [
            types.GET_ONE_PRODUCT_REQUEST,
            types.GET_ONE_PRODUCT_SUCCESS,
            types.GET_ONE_PRODUCT_FAILURE
        ]
    })
}