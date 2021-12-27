export const getAllProducers = (state) => state.entities.producers.allIds.map(id => state.entities.producers.byId[id]);
export const getProducerById = (state, id) => state.entities.producers.byId[id];