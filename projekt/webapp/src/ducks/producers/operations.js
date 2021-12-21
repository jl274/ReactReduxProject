import { types } from './types';
import { createAction } from 'redux-api-middleware';
import { schema, normalize} from 'normalizr';
import _ from 'lodash';

const producerSchema = new schema.Entity('producers');
const producersSchema = new schema.Array(producerSchema);

export const getProducersFromDB = () => {
    return createAction({
        endpoint: "http://localhost:5000/producers",
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.GET_PRODUCERS_REQUEST,
            {
                type: types.GET_PRODUCERS_SUCCESS,
                payload: async (action, state, res) => {
                    console.log('PAYLOAD', action, state, res);
                    const json = await res.json();
                    const producers = json.producers.map(x => {return _.omit({...x, id: x._id}, '_id')})
                    const { entities } = normalize(producers, producersSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
            types.GET_PRODUCERS_FAILURE
        ]
    })
}