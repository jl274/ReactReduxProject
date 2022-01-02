export const getAllOffersOf = (state, idGame) => state.entities.offers.allIds
    .map(id => state.entities.offers.byId[id])
    .filter(offer => offer.product === idGame);

export const getAllOffers = (state) => state.entities.offers.allIds.map(id => state.entities.offers.byId[id]);
export const getOneOffer = (state, id) => state.entities.offers.byId[id];