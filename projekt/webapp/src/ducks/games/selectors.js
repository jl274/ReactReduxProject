import _ from 'lodash';

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
export const getGamesNameAndId = state => state.entities.games.allIds.map(id => {
    return {
        id: state.entities.games.byId[id].id,
        name: state.entities.games.byId[id].name,
        producer: state.entities.games.byId[id].producer
    }
});
export const getAllGenres = state => _.uniq(state.entities.games.allIds.map(id => state.entities.games.byId[id].genre));