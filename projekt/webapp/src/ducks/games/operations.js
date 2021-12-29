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
                    const games_with_ids = json.games.map(x => {return _.omit({...x, id: x._id}, '_id')})
                    const { entities } = normalize(games_with_ids, gamesSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
            types.GET_GAMES_FAILURE
        ]
    })
};

export const sendGameToDB = (game) => {
    return createAction({
        endpoint: "http://localhost:5000/games",
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game),
        types: [
            types.POST_GAMES_REQUEST,
            {
                type: types.POST_GAMES_SUCCESS,
                payload: async (action, state, res) => {
                    console.log('PAYLOAD', action, state, res);
                    const json = await res.json();
                    json.game['id'] = json.game['_id'];
                    const new_game = _.omit(json.game, '_id');
                    const { entities } = normalize(new_game, gameSchema);
                    return entities;
                },
                meta: { actionType: 'POST' }
           },
            types.POST_GAMES_FAILURE
        ]
    })
}

export const deleteGameFromDB = (game) => {
    console.log(game)
    return createAction({
        endpoint: `http://localhost:5000/games/${game.id}`,
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.DELETE_GAMES_REQUEST,
            {
                type: types.DELETE_GAMES_SUCCESS,
                payload: async (action, state, res) => {
                    const { entities } = normalize(game, gameSchema);
                    return entities;
                },
                meta: { actionType: 'DELETE' }
           },
            types.DELETE_GAMES_FAILURE
        ]
    })
}