import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getOneGameById } from "../../ducks/games/selectors";
import '../../styles/Details.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const lightBulbIcon = <FontAwesomeIcon icon={faLightbulb}/>;
const lightBulbIconRed = <FontAwesomeIcon className="purple" icon={faLightbulb}/>;

const GameDetails = ({game}) => {

    const { t } = useTranslation();

    return (
        <div className="detailsBox">
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
                        <p>{game.producer}</p>
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
    )
}

const mapStateToProps = (state, otherProps) => {
    const {match: {params: {id}}} = otherProps
    return {
        game: getOneGameById(state, id)
    }
}

export default withRouter(connect(mapStateToProps, null)(GameDetails));