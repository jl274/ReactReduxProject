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