import { connect } from "react-redux";
import { getAllOffers } from "../../ducks/offers/selectors";
import OfferOverview from "./OfferOverview";
import '../../styles/OffersList.scss';
import { getGameIdPlusUrl } from "../../ducks/games/selectors";

const OffersList = ({offers, urlList}) => {

    return (
        <div className="offersBox">
            <div>
                <ul className="list">
                    {offers.map(offer => <li key={offer.id} id={offer.id}>
                        <OfferOverview 
                            data={offer} 
                            imgUrl={urlList.find(x => x.idArray.includes(offer.id)).url 
                                ? urlList.find(x => x.idArray.includes(offer.id)).url 
                                : 'https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1'} 
                            link={urlList.find(x => x.idArray.includes(offer.id)).id}
                            gameTitle={urlList.find(x => x.idArray.includes(offer.id)).name}
                        />
                    </li>)}
                </ul>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        offers: getAllOffers(state),
        urlList: getGameIdPlusUrl(state)
    }
}

export default connect(mapStateToProps, null)(OffersList);