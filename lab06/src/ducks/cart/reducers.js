import { types } from "./types";

const initState = {
    cartsList: []
}

export const cartReducer = (state=initState, action) => {
    switch(action.type){

        case types.CARTS_GET_SUCCESS:
            return {...state, cartsList: action.payload};

        case types.ADD_TO_CART_SUCCESS:
             const newCartsList = state.cartsList.map(cart => {
                if (`${cart.id}` === `${action.payload.id}`){
                    console.log(action.payload)
                    return action.payload
                } else {
                    return cart
                }
            })
            return {...state, cartsList: newCartsList};

        case types.NEW_CART_SUCCESS:
            return {...state, cartsList: [...state.cartsList, action.payload]}

        case types.DELETE_CART_SUCCESS:
            return {...state, cartsList: state.cartsList.filter(cart => `${cart.id}` !== `${action.payload.id}`)}

        case types.ADD_TO_CART:
            // const foundCart = state.cartsList.find(cart => `${cart.id}` === `${action.payload.idCart}`);
            // if (foundCart){
            //     const foundProductInCart = foundCart.products.find(product => `${product.productId}` === `${action.payload.idProduct}`);
            //     if (foundProductInCart){
            //         return {...state, cartsList: state.cartsList.map(cart => {
            //                 if (`${cart.id}` === `${action.payload.idCart}`){
            //                     cart.products.map(product => {
            //                         if (`${product.productId}` === `${action.payload.idProduct}`){
            //                             return {...product, quantity: parseInt(product.quantity) + 1}
            //                         } else {
            //                             return product
            //                         }
            //                     })
            //                 }
            //                 return cart
            //             }
            //         )}
            //     }
            // }
            return state

        default:
            return state;
    }
}