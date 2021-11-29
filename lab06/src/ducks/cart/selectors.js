export const getAllCarts = state => state.carts.cartsList;
export const getCartByUserId = (state, id) => state.carts.cartsList.find(x => `${x.userId}` === `${id}`);