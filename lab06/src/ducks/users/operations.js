import { createAction } from 'redux-api-middleware'
import { types } from './types'

export const getUsersOperation = () => {
    return createAction({
        endpoint: "https://fakestoreapi.com/users",
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        types: [
            types.USER_GET_REQUEST,
            types.USER_GET_SUCCESS,
            types.USER_GET_FAILURE
        ]
    })
}

export const getOneUser = (id) => {
    return createAction({
        endpoint: `https://fakestoreapi.com/users/${id}`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        types: [
            types.ONE_USER_GET_REQUEST,
            types.ONE_USER_GET_SUCCESS,
            types.ONE_USER_GET_FAILURE
        ]
    })
}