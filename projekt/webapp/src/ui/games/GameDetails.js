import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getOneGameById } from "../../ducks/games/selectors";
import '../../styles/Details.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import '../../styles/Tooltip.scss';
import { getAllProducers } from "../../ducks/producers/selectors";
import { getAllOffersOf } from "../../ducks/offers/selectors";
import OfferOverview from "../offers/OfferOverview";
import { useEffect } from "react";
import _ from 'lodash';

const lightBulbIcon = <FontAwesomeIcon icon={faLightbulb}/>;
const lightBulbIconRed = <FontAwesomeIcon className="purple" icon={faLightbulb}/>;
const returnArrow = <FontAwesomeIcon icon={faArrowLeft} />;

const GameDetails = ({game, history, allProducers, gameOffers}) => {

    const { t } = useTranslation();

    useEffect(()=>{window.scrollTo(0, 0)}, [])

    const goBack = () => {
        history.push('/');
    }

    const getProducerNameById = (id) => {
        if (allProducers){
        return allProducers.find(x => x.id === id).name;
        } else {
            return "Error occured"
        }
    }

    return (
        <>
        <div className="detailsBox">
            <div className='arrow' aria-label={`${t('gameForm.return')}`} data-tooltip="up" onClick={goBack}>
                    {returnArrow}
            </div>
            <div className="details">
                <ul>
                    <li className="name">
                        {game.name}
                    </li>
                    <li>
                        <p>{t('details.genre')}</p>
                        <p>{game.genre}</p>
                    </li>
                    <li>
                        <p>{t('details.producer')}</p>
                        <p>{getProducerNameById(game.producer)}</p>
                    </li>
                    <li>
                        <p>{t('details.complexity')}</p>
                        <p>
                            {lightBulbIconRed}
                            {parseInt(game.complexity)/20 > 1 ? lightBulbIconRed : lightBulbIcon}
                            {parseInt(game.complexity)/20 > 2 ? lightBulbIconRed : lightBulbIcon}
                            {parseInt(game.complexity)/20 > 3 ? lightBulbIconRed : lightBulbIcon}
                            {parseInt(game.complexity)/20 > 4 ? lightBulbIconRed : lightBulbIcon}
                            {'\t'}
                            {game.complexity}/100
                        </p>
                    </li>
                    <li>
                        <p>{t('details.minAge')}</p>
                        <p>{game.minAge}</p>
                    </li>
                    <li>
                        <p>{t('details.playingTime')}</p>
                        <p>{game.playingTime}</p>
                    </li>
                    <li>
                        <p>{t('details.offers')}</p>
                        <p>{game.offers.length}</p>
                    </li>
                    <li>
                        <p>{t('details.description.name')}</p>
                        <p className="description">{game.description ? game.description : t('details.description.unavailable')}</p>
                    </li>
                </ul>
                <div className="img">
                    <img src={game.url ? game.url : 'https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1'}
                    alt="Game cover"></img>
                </div>
            </div>
        </div>
        {gameOffers ? _.sortBy(gameOffers, ['price']).map(offer => <OfferOverview key={offer.id} id={offer.id} data={offer} imgUrl={game.url} />) : null}
        </>
    )
}

const mapStateToProps = (state, otherProps) => {
    const {match: {params: {id}}} = otherProps
    return {
        game: getOneGameById(state, id),
        allProducers: getAllProducers(state),
        gameOffers: getAllOffersOf(state, id)
    }
}

export default withRouter(connect(mapStateToProps, null)(GameDetails));