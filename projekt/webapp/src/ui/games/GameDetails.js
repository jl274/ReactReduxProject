import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getOneGameById } from "../../ducks/games/selectors";
import '../../styles/Details.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faArrowLeft, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import '../../styles/Tooltip.scss';
import { getAllProducers } from "../../ducks/producers/selectors";
import { getAllOffersOf } from "../../ducks/offers/selectors";
import OfferOverview from "../offers/OfferOverview";
import { useEffect, useState } from "react";
import _ from 'lodash';
import { deleteGameFromDB, getGamesFromDB } from '../../ducks/games/operations';
import { getProducersFromDB } from '../../ducks/producers/operations';
import Modal from 'react-modal';
import { togglerStatus } from "../../ducks/toggler/selectors";
import { hideToggle, showToggle } from "../../ducks/toggler/actions";
import { getCurrencyByCode } from "../../ducks/currencies/selectors";

const lightBulbIcon = <FontAwesomeIcon icon={faLightbulb}/>;
const lightBulbIconRed = <FontAwesomeIcon className="purple" icon={faLightbulb}/>;
const returnArrow = <FontAwesomeIcon icon={faArrowLeft} />;
const editIcon = <FontAwesomeIcon icon={faPen} />;
const trashIcon = <FontAwesomeIcon icon={faTrash} />;

const GameDetails = ({game, history, allProducers, gameOffers, getGamesFromDB, getProducersFromDB, deleteGameFromDB, 
    deleteModalStatus, showToggle, hideToggle, currencyGetter}) => {

    if (!game){
        (async () => {
        await getProducersFromDB();
        await getGamesFromDB();
        })()
    }

    const { t } = useTranslation();

    useEffect(()=>{window.scrollTo(0, 0)}, [])

    const goBack = () => {
        history.location.state ? history.goBack() : history.push('/');
    }

    const getProducerNameById = (id) => {
        if (allProducers && game){
        return allProducers.find(x => x.id === id).name;
        } else {
            return "Error occured"
        }
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: 0,
          "borderRadius": '30px'
        },
    };

    const deleteGame = async (game) => {
        await deleteGameFromDB(game);
        goBack();
    }

    const [activeCurrency, setActiveCurrency] = useState("pln");

    const changeCurrency = (price) => {
        return Math.round((parseFloat(price) * parseFloat(currencyGetter(`${activeCurrency}`))) * 100) / 100;
    }

    Modal.setAppElement('body')

    return game ? (
        <>
        <div className="detailsBox">
            <div className='arrow' aria-label={`${t('gameForm.return')}`} data-tooltip="left" onClick={goBack}>
                {returnArrow}
            </div>
            <div className='edit' aria-label={`${t('gameForm.edit')}`} data-tooltip="left" onClick={()=>{
                history.push({pathname: `/game/${game.id}/edit`, state: "edit"});
            }}
            >
                {editIcon}
            </div>
            <div className='delete' aria-label={`${t('gameForm.delete')}`} data-tooltip="left" onClick={()=>{
                if (!deleteModalStatus) {showToggle('deleteModal')}
            }}
            >
                {trashIcon}
                <Modal
                    isOpen={deleteModalStatus}
                    onRequestClose={hideToggle}
                    style={customStyles}
                    contentLabel="Delete modal"
                >
                    <div className="deleteModal">
                        {game.offers.length !== 0 ? <h2>{t('details.gameDeleteError')}</h2> :
                         <h2>{`${t('producerForm.modal.modalTitle')}`} {game.name}?</h2>}
                        <div className="buttons">
                            <button onClick={()=>{hideToggle('deleteModal')}}>{`${t('producerForm.modal.cancel')}`}</button>
                            <button className={`confirm ${game.offers.length !== 0 ? 'disabled' : ''}`} disabled={game.offers.length !== 0}
                             onClick={()=>{hideToggle('deleteModal'); deleteGame(game)}}>{`${t('producerForm.modal.confirm')}`}</button>
                        </div>
                    </div>
                </Modal>
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
                        <p>{gameOffers.length}</p>
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
        <div className="shrink">
        {gameOffers ? _.sortBy(gameOffers, ['price']).map(offer => <OfferOverview key={offer.id} id={offer.id} 
            data={{...offer, price: changeCurrency(offer.price)}} currency={activeCurrency} imgUrl={game.url} />) : null}
        </div>
        <div className='currencies'>
                <p>{t('offersList.currency')}</p>
                <div>
                <button className={`${activeCurrency === "pln" ? "active" : ""} l`} onClick={()=>{setActiveCurrency("pln")}}>PLN</button>
                <button className={`${activeCurrency === "eur" ? "active" : ""} c`} onClick={()=>{setActiveCurrency("eur")}}>EUR</button>
                <button className={`${activeCurrency === "usd" ? "active" : ""} c`} onClick={()=>{setActiveCurrency("usd")}}>USD</button>
                <button className={`${activeCurrency === "gbp" ? "active" : ""} r`} onClick={()=>{setActiveCurrency("gbp")}}>GBP</button>
                </div>
        </div>
        </>
    ) : <></>
}

const mapStateToProps = (state, otherProps) => {
    const {match: {params: {id}}} = otherProps
    return {
        game: getOneGameById(state, id),
        allProducers: getAllProducers(state),
        gameOffers: getAllOffersOf(state, id),
        deleteModalStatus: togglerStatus(state, "deleteModal"),
        currencyGetter: (code) => getCurrencyByCode(state, code)
    }
}

const mapDispatchToProps = {
    getProducersFromDB,
    // getOffersFromDB,
    getGamesFromDB,
    deleteGameFromDB,
    showToggle,
    hideToggle
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameDetails));