export const getAllGames = (state) => state.entities.games.allIds.map(id => state.entities.games.byId[id]);
export const getOneGameById = (state, id) => state.entities.games.byId[id];
export const getGameIdPlusUrl = (state) => state.entities.games.allIds.map(id =>
    {
        return {
            idArray: state.entities.games.byId[id].offers, 
            url: state.entities.games.byId[id].url, 
            id: state.entities.games.byId[id].id,
            name: state.entities.games.byId[id].name
        }
    }
)