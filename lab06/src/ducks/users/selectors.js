export const getUsers = state => state.users.usersList;
export const getUsersIsLoading = state => state.users.loading ? true : false;
export const getUserDetail = (state, id) => state.users.usersList.find(user => `${user.id}` === `${id}`);