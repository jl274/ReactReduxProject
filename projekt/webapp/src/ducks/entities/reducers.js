import _ from 'lodash';

const allEntities = [
    "games",
    "producers",
    "offers"
];

/*

    users: {
        byId:
        allIds
    },
*/

const defaultState = allEntities.reduce(
    (acc, entity) => ({
        ...acc,
        [entity]: {
            byId: {},
            allIds: []
        }
    }), {}
);

const entityReducer = (entity, state = { allIds: [], byId: {} }, action) => {

    const actionEntities = action.payload[entity];

    const { actionType } = action.meta;

    switch(actionType) {
        case 'GET_ALL':
            return {
                byId: {
                    ...Object.keys(actionEntities).reduce(
                        (acc, id) => ({
                            ...acc,
                            [id]: {
                                ...state.byId[id],
                                ...actionEntities[id]
                            }
                        })
                    , {}),
                },
                allIds: Object.keys(actionEntities)
            }
        case 'POST':
            return {
                byId: {
                    ...state.byId,
                    ...Object.keys(actionEntities).reduce(
                        (acc, id) => ({
                            ...acc,
                            [id]: {
                                // ...state.byId[id],
                                ...actionEntities[id]
                            }
                        })
                    , {})
                },
                allIds: [...state.allIds, ...Object.keys(actionEntities)]
            };
        case 'DELETE':
            return {
                byId: _.omit(state.byId, Object.keys(actionEntities)[0]),
                allIds: state.allIds.filter(id => !Object.keys(actionEntities).includes(id)),
            }
        case 'EDIT':
            return {
                byId: {
                    ...state.byId, 
                    ...Object.keys(actionEntities).reduce(
                    (acc, id) => ({
                        ...acc,
                        [id]: {
                            ...actionEntities[id]
                        }
                    })
                , {})},
                allIds: state.allIds
            }
        default:
            return state;

    }
}


export const entities = (state = defaultState, action) => {
    if(!action.meta || !action.meta.actionType) return state;


    return {
        ...state,
        ...Object.keys(action.payload).reduce(
            (acc, entity) => ({
                ...acc,
                [entity]: entityReducer(entity, state[entity], action)
            }), {}
        ),
    }
}

