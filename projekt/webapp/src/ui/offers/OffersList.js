import { connect } from "react-redux";
import { getAllOffers } from "../../ducks/offers/selectors";
import OfferOverview from "./OfferOverview";
import '../../styles/OffersList.scss';
import { getGameIdPlusUrl } from "../../ducks/games/selectors";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const plus = <FontAwesomeIcon icon={faPlus} />

const OffersList = ({offers, urlList}) => {

    const { t } = useTranslation();

    return (
        <>
        <div className="offersControl">
            <h2>{t('offersList.h2')}</h2>
            <div></div>
            <div>
                <button><Link to='/offers/new'>{t('offersList.add')} {plus}</Link></button>
            </div>
        </div>
        <div className="offersBox">
            <div>
                <ul className="list">
                    {console.log(urlList)}
                    {offers.map(offer => urlList.find(x => x.idArray.includes(offer.id)) ? <li key={offer.id} id={offer.id}>
                        <OfferOverview 
                            data={offer} 
                            imgUrl={urlList.find(x => x.idArray.includes(offer.id)).url 
                                ? urlList.find(x => x.idArray.includes(offer.id)).url 
                                : 'https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1'} 
                            link={urlList.find(x => x.idArray.includes(offer.id)).id}
                            gameTitle={urlList.find(x => x.idArray.includes(offer.id)).name}
                        />
                    </li> : null)}
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