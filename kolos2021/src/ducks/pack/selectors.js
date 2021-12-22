export const getAllPackList = (state) => state.packs;
export const getPackById = (state, id) => state.packs.find(x => x.id === id);