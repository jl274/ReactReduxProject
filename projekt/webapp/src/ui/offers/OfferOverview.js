import '../../styles/Overview.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStoreAlt, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { deleteOfferFromDB } from '../../ducks/offers/operations';
import { hideToggle, showToggle } from '../../ducks/toggler/actions';
import { togglerStatus } from '../../ducks/toggler/selectors';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { getGamesFromDB } from '../../ducks/games/operations';

const shopIcon = <FontAwesomeIcon icon={faStoreAlt}/>
const editIcon = <FontAwesomeIcon icon={faPen} />;
const trashIcon = <FontAwesomeIcon icon={faTrash} />;

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

const OfferOverview = ({data, imgUrl, link, gameTitle, currency, 
    deleteOfferFromDB, hideToggle, showToggle, deleteModalStatus, getGamesFromDB}) => {

    const { t } = useTranslation();

    const deleteOffer = async () => {
        await deleteOfferFromDB({id: data.id, shop: data.shop, price: data.price, link: data.link, __v: data.__V});
    }

    Modal.setAppElement('body');
    
    return (
        <div className="overview">
            <ul>
                <>
                    <div className='delete' onClick={()=>{showToggle(`${data.id}offerDeleteModal`)}}>{trashIcon}</div>
                    <div className='edit'><Link to={`/offers/${data.id}/edit`}>{editIcon}</Link></div>
                </>
                <li className='shop'>
                    <p>{shopIcon}</p> {data.shop}
                    <Modal
                        isOpen={deleteModalStatus}
                        onRequestClose={hideToggle}
                        style={customStyles}
                        contentLabel="Delete modal"
                    >
                        <div className="deleteModal">
                            <h2>{`${t('producerForm.modal.modalTitle')}`} {data.shop}{gameTitle ? ": \"" + gameTitle + "\"" : null}?</h2>
                            <div className="buttons">
                                <button onClick={()=>{hideToggle(`${data.id}offerDeleteModal`)}}>{`${t('producerForm.modal.cancel')}`}</button>
                                <button className={`confirm`}
                                onClick={()=>{hideToggle(`${data.id}offerDeleteModal`); deleteOffer()}}>{`${t('producerForm.modal.confirm')}`}</button>
                            </div>
                        </div>
                    </Modal>
                </li>
                <li className='img'>
                    <img src={imgUrl} alt="Miniature cover"></img>
                </li>
                <li className={`${gameTitle ? 'priceOrTitle' : ''}`}>
                    {
                        gameTitle ? 
                        <>
                            <div className='gameTitle'>{gameTitle}</div>
                            <div>{t('offerOverview.price')}<p>{parseFloat(data.price)}</p>,-{currency.toUpperCase()}</div>
                        </> : 
                        <>
                            {t('offerOverview.price')}<p>{parseFloat(data.price)}</p>,-{currency.toUpperCase()}
                        </>
                    }
                    
                </li>
                <li className={`selectButtons ${gameTitle ? 'smaller' : ''}`}>
                    <a href={data.link} target="_blank" rel="noopener noreferrer" ><button type='submit'>{t('offerOverview.button')}</button></a>
                    {link ? <Link to={{pathname: `/game/${link}`, state: "offer"}}><button>{t('offerOverview.details')}</button></Link> : null}
                </li>
            </ul>
        </div>
    )
};

const mapStateToProps = (state, otherProps) => {
    return {
        ...otherProps,
        deleteModalStatus: togglerStatus(state, `${otherProps.data.id}offerDeleteModal`),
    }
}

const mapDispatchToProps = {
    deleteOfferFromDB,
    showToggle,
    hideToggle,
    getGamesFromDB
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferOverview);