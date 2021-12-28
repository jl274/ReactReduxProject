import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getProducerById } from "../../ducks/producers/selectors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronUp, faTags } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Details.scss'
import { getGamesNameAndId } from "../../ducks/games/selectors";

const flagIcon = <FontAwesomeIcon icon={faFlag} />
const calendarIcon = <FontAwesomeIcon icon={faCalendarAlt} />
const productsIcon = <FontAwesomeIcon icon={faTags} />
const down = <FontAwesomeIcon icon={faChevronDown} />
const up = <FontAwesomeIcon icon={faChevronUp} />

const ProducerDetails = ({producer, games}) => {

    const getMatchingGames = () => {
        console.log(games)
        return games.filter(game => game.producer === producer.id);
    };

    return (
        <div className="detailsBox">
            <div className="details wide">
                <ul>
                    <li className="name">{producer.name}</li>
                    <li>
                        <p>{flagIcon}Country: </p>
                        <p>{producer.country}</p>
                    </li>
                    <li>
                        <p>{calendarIcon}Established in: </p>
                        <p>{producer.established}</p>
                    </li>
                    <li className="games">
                        <p>{productsIcon}Games: </p>
                        <div>
                            {console.log(getMatchingGames())}
                            {getMatchingGames() ? getMatchingGames().map(game => 
                                <p key={game.id} id={game.id}>
                                    <Link to={`/game/${game.id}`}>{game.name}</Link>
                                </p>
                            ) : <p>No games yet</p>}
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