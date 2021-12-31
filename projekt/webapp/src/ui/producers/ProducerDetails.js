import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getProducerById } from "../../ducks/producers/selectors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { /*faChevronDown, faChevronUp,*/ faTags, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Details.scss'
import { getGamesNameAndId } from "../../ducks/games/selectors";
import { useTranslation } from 'react-i18next';

const flagIcon = <FontAwesomeIcon icon={faFlag} />
const calendarIcon = <FontAwesomeIcon icon={faCalendarAlt} />
const productsIcon = <FontAwesomeIcon icon={faTags} />
const returnArrow = <FontAwesomeIcon icon={faArrowLeft} />;

const ProducerDetails = ({producer, games, history}) => {

    const { t } = useTranslation();

    const getMatchingGames = () => {
        return games.filter(game => game.producer === producer.id);
    };

    const goBack = () => {
        history.location.state ? history.goBack() : history.push('/');
    }

    return (
        <div className="detailsBox">
            <div className='arrow' aria-label={`${t('gameForm.return')}`} data-tooltip="left" onClick={goBack}>
                    {returnArrow}
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
        games: getGamesNameAndId(state)
    }
}

export default withRouter(connect(mapStateToProps, null)(ProducerDetails));