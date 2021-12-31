import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getProducerById } from "../../ducks/producers/selectors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { /*faChevronDown, faChevronUp,*/ faTags, faArrowLeft, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Details.scss'
import { getGamesNameAndId } from "../../ducks/games/selectors";
import { useTranslation } from 'react-i18next';
import { togglerStatus } from "../../ducks/toggler/selectors";
import { hideToggle, showToggle } from "../../ducks/toggler/actions";
import Modal from 'react-modal';

const flagIcon = <FontAwesomeIcon icon={faFlag} />
const calendarIcon = <FontAwesomeIcon icon={faCalendarAlt} />
const productsIcon = <FontAwesomeIcon icon={faTags} />
const returnArrow = <FontAwesomeIcon icon={faArrowLeft} />;
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

const ProducerDetails = ({producer, games, history, showToggle, hideToggle, deleteModalStatus}) => {

    const { t } = useTranslation();

    const getMatchingGames = () => {
        return games.filter(game => game.producer === producer.id);
    };

    const goBack = () => {
        history.location.state ? history.goBack() : history.push('/');
    }

    return (
        <div className="detailsBox">
            <div className='arrow' aria-label={`${t('producerForm.return')}`} data-tooltip="left" onClick={goBack}>
                    {returnArrow}
            </div>
            <div className='edit' aria-label={`${t('producerForm.edit')}`} data-tooltip="left" onClick={()=>{
                history.push({pathname: `/producer/${producer.id}/edit`, state: "edit"});
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
                        {getMatchingGames().length !== 0 ? <h2>{`${t('producerForm.modal.modalTitleError')}`}</h2> 
                        : <h2>{`${t('producerForm.modal.modalTitle')}`} {producer.name}?</h2>}
                        <div className="buttons">
                            <button onClick={()=>{hideToggle('deleteModal')}}>{`${t('producerForm.modal.cancel')}`}</button>
                            <button disabled={getMatchingGames().length === 0} 
                             className={`confirm ${getMatchingGames().length !== 0 ? 'disabled' : ''}`}
                             onClick={()=>{hideToggle('deleteModal')}}>{`${t('producerForm.modal.confirm')}`}
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="details wide">
                <ul>
                    <li className="name">{producer.name}</li>
                    <li>
                        <p>{flagIcon}{t('producer.country')}</p>
                        <p>{producer.country}</p>
                    </li>
                    <li>
                        <p>{calendarIcon}{t('producer.established')}</p>
                        <p>{producer.established.slice(0,10)}</p>
                    </li>
                    <li className="games">
                        <p>{productsIcon}{t('producer.games')}</p>
                        <div>
                            {getMatchingGames().length !== 0 ? getMatchingGames().map(game => 
                                <p key={game.id} id={game.id}>
                                    <Link to={{pathname: `/game/${game.id}`, state:"producer"}}>{game.name}</Link>
                                </p>
                            ) : <p>{t('producer.empty')}</p>}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state, otherProps) => {
    const {match: {params: { id }}} = otherProps;
    return {
        producer: id ? getProducerById(state, id) : null,
        games: getGamesNameAndId(state),
        deleteModalStatus: togglerStatus(state, "deleteModal")
    }
}

const mapDispatchToProps = {
    showToggle,
    hideToggle
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProducerDetails));