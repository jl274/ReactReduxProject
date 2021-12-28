import { connect } from "react-redux";
import { getAllOffers } from "../../ducks/offers/selectors";
import OfferOverview from "./OfferOverview";
import '../../styles/OffersList.scss';
import { getGameIdPlusUrl } from "../../ducks/games/selectors";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const plus = <FontAwesomeIcon icon={faPlus} />

const OffersList = ({offers, urlList}) => {

    return (
        <>
        <div className="offersControl">
            <h3>Offers</h3>
            <div></div>
            <div>
                <button><Link to='/offers/new'>Add new offer {plus}</Link></button>
            </div>
        </div>
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
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        offers: getAllOffers(state),
        urlList: getGameIdPlusUrl(state)
    }
}

export default connect(mapStateToProps, null)(OffersList);