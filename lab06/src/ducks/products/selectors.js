export const getProductsLits = state => state.products.productsList;
export const getProductsLoading = state => state.products.loading ? true : false;
export const getProductsCategories = state => state.products.categoriesList;
export const getProductDetail = (state, id) => state.products.productsList.find(product => `${product.id}` === `${id}`);
export const getAllProductsWithIds = (state, ids) => state.products.productsList.filter(product => ids.includes(product.id));