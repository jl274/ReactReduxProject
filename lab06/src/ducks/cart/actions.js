import { types } from "./types"

export const addToCart = (idProduct, idCart) =>{ return {
    type: types.ADD_TO_CART,
    payload: {
        idProduct,
        idCart
    }
}}