import { types } from './types';
import { createAction } from 'redux-api-middleware';
import { schema, normalize} from 'normalizr';
import _ from 'lodash';

const gameSchema = new schema.Entity('games');
const gamesSchema = new schema.Array(gameSchema);

export const getGamesFromDB = () => {
    return createAction({
        endpoint: "http://localhost:5000/games",
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.GET_GAMES_REQUEST,
            {
                type: types.GET_GAMES_SUCCESS,
                payload: async (action, state, res) => {
                    console.log('PAYLOAD', action, state, res);
                    const json = await res.json();
                    console.log('--------------------------');
                    const games_with_ids = json.games.map(x => {return _.omit({...x, id: x._id}, '_id')})
                    const { entities } = normalize(games_with_ids, gamesSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
            types.GET_GAMES_FAILURE
        ]
    })
}