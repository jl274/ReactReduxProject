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
import { getCurrencyByCode } from "../../ducks/currencies/selectors";

const plus = <FontAwesomeIcon icon={faPlus} />

const OffersList = ({offers, urlList, currencyGetter}) => {

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
        return offers_copy
    }

    const [activeCurrency, setActiveCurrency] = useState("pln");

    const changeCurrency = (price) => {
        return Math.round((parseFloat(price) * parseFloat(currencyGetter(`${activeCurrency}`))) * 100) / 100;
    }

    return (
        <>
        <div className="offersControl">
            <h2>{t('offersList.h2')}</h2>
            <div className='sortOptions'>
                <p>{t('offersList.currency')}</p>
                <div>
                <button className={`${activeCurrency === "pln" ? "active" : ""} l`} onClick={()=>{setActiveCurrency("pln")}}>PLN</button>
                <button className={`${activeCurrency === "eur" ? "active" : ""} c`} onClick={()=>{setActiveCurrency("eur")}}>EUR</button>
                <button className={`${activeCurrency === "usd" ? "active" : ""} c`} onClick={()=>{setActiveCurrency("usd")}}>USD</button>
                <button className={`${activeCurrency === "gbp" ? "active" : ""} r`} onClick={()=>{setActiveCurrency("gbp")}}>GBP</button>
                </div>
            </div>
            <div className='sortOptions'>
                <p>{t('offersList.sortBy')}</p>
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
                    {offersToMap().map(offer => urlList.find(x => x.id === offer.product) ? <li key={offer.id} id={offer.id}>
                        <OfferOverview 
                            data={{...offer, price: changeCurrency(offer.price)}}
                            currency={activeCurrency} 
                            imgUrl={urlList.find(x => x.id === offer.product).url 
                                ? urlList.find(x => x.id === offer.product).url 
                                : 'https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1'} 
                            link={urlList.find(x => x.id === offer.product).id}
                            gameTitle={urlList.find(x => x.id === offer.product).name}
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
        urlList: getGameIdPlusUrl(state),
        currencyGetter: (code) => getCurrencyByCode(state, code)
    }
}

export default connect(mapStateToProps, null)(OffersList);