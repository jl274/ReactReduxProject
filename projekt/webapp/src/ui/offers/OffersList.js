import { connect } from "react-redux";
import { getAllOffers } from "../../ducks/offers/selectors";
import OfferOverview from "./OfferOverview";
import '../../styles/OffersList.scss';
import { getGameIdPlusUrl } from "../../ducks/games/selectors";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { useState } from 'react';

const plus = <FontAwesomeIcon icon={faPlus} />

const OffersList = ({offers, urlList}) => {

    const { t } = useTranslation();

    const [sortMethod, setSortMethod] = useState("new");

    const offersToMap = () => {
        let offers_copy = [...offers]
        if (sortMethod === "new"){
            offers_copy = _.reverse(offers_copy)
        } else if (sortMethod === "cheap"){
            offers_copy = _.sortBy(offers_copy, ['price']);
        } else if (sortMethod === "expensive"){
            offers_copy = _.reverse(_.sortBy(offers_copy, ['price']));
        } else if (sortMethod === "az"){
            offers_copy = _.sortBy(offers_copy, ['shop']);
        } else if (sortMethod === "za"){
            offers_copy = _.reverse(_.sortBy(offers_copy, ['shop']));
        }
        console.log(offers_copy)
        return offers_copy
    }

    return (
        <>
        <div className="offersControl">
            <h2>{t('offersList.h2')}</h2>
            <div className='sortOptions'>
                <p>Sort by:</p>
                <div>
                    <button className={`${sortMethod === "new" ? "active" : ""} left`} onClick={()=>{setSortMethod("new")}}>Newest</button>
                    <button className={`${sortMethod === "old" ? "active" : ""} right`} onClick={()=>{setSortMethod("old")}}>Oldest</button>
                </div>
                <div>
                    <button className={`${sortMethod === "az" ? "active" : ""} left`} onClick={()=>{setSortMethod("az")}}>{"A->Z"}</button>
                    <button className={`${sortMethod === "za" ? "active" : ""} right`} onClick={()=>{setSortMethod("za")}}>{"Z->A"}</button>
                </div>
                <div>
                    <button className={`${sortMethod === "cheap" ? "active" : ""} left`} onClick={()=>{setSortMethod("cheap")}}>Cheapest</button>
                    <button className={`${sortMethod === "expensive" ? "active" : ""} right`} onClick={()=>{setSortMethod("expensive")}}>Most expensive</button>
                </div>
            </div>
            <div>
                <button><Link to='/offers/new'>{t('offersList.add')} {plus}</Link></button>
            </div>
        </div>
        <div className="offersBox">
            <div>
                <ul className="list">
                    {/* {console.log(urlList)} */}
                    {offersToMap().map(offer => urlList.find(x => x.idArray.includes(offer.id)) ? <li key={offer.id} id={offer.id}>
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