import { types } from './types';
import { createAction } from 'redux-api-middleware';
import { schema, normalize} from 'normalizr';
import _ from 'lodash';
import { updateOffersList } from '../games/actions';

const offerSchema = new schema.Entity('offers');
const offersSchema = new schema.Array(offerSchema);

export const getOffersFromDB = () => {
    return createAction({
        endpoint: "http://localhost:5000/offers",
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.GET_OFFERS_REQUEST,
            {
                type: types.GET_OFFERS_SUCCESS,
                payload: async (action, state, res) => {
                    console.log('PAYLOAD', action, state, res);
                    const json = await res.json();
                    console.log('--------------------------');
                    const offers = json.offers.map(x => {return _.omit({...x, id: x._id}, '_id')})
                    const { entities } = normalize(offers, offersSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
            types.GET_OFFERS_FAILURE
        ]
    })
};

export const sendOfferToDB = (offer) => {
    return createAction({
        endpoint: "http://localhost:5000/offers",
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(offer),
        types: [
            types.POST_OFFERS_REQUEST,
            {
                type: types.POST_OFFERS_SUCCESS,
                payload: async (action, state, res) => {
                    console.log('PAYLOAD', action, state, res);
                    const json = await res.json();
                    json.offer['id'] = json.offer['_id'];
                    const new_offer = _.omit(json.offer, '_id');
                    updateOffersList(new_offer.product, new_offer.id)
                    const { entities } = normalize(new_offer, offerSchema);
                    return entities;
                },
                meta: { actionType: 'POST' }
           },
            types.POST_OFFERS_FAILURE
        ]
    })
}