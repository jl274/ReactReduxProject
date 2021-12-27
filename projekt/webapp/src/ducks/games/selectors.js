export const getAllGames = (state) => state.entities.games.allIds.map(id => state.entities.games.byId[id]);
export const getOneGameById = (state, id) => state.entities.games.byId[id];