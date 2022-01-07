import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllGames } from "../ducks/games/selectors";
import { useTranslation } from 'react-i18next';
import { getAllProducers } from "../ducks/producers/selectors";
import { Link } from 'react-router-dom';
import '../styles/GamesList.scss'

export const Search = ({ games, phrase, producers }) => {

    const { t } = useTranslation();
    const noCoverSrc = 'https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1';

    const getProducerNameFromId = (id) => {
        if (producers){
        return producers.find(x => x.id === id).name;
        } else {
            return "Error occured"
        }
    }

    const searchForPhrase = () => {
        const game_copy = [...games];
        return game_copy.filter(game => {
            for (const word of phrase.split(" ")) {
                if (game.name.toLowerCase().includes(word.toLowerCase())){return true}
            }
            return false
        })
    }

    return (
        <>
        <div className="searchResult" style={{"textTransform": "uppercase"}}>
            {`${t('gameList.searchResult')} "${phrase}"`}
        </div>
        <div className="itemsList">
        <ul>
        {games && phrase && searchForPhrase().length ? 
        searchForPhrase().map(game => <li key={game.id}>
            <div className='img'>
                <img src={game.url ? game.url : noCoverSrc} alt='Cover' ></img>
            </div>
            <div className='info'>
                <div className='gameName'>{game.name}</div>
                <div className='otherInfo'>
                    <div>{t('gameList.genre')}{game.genre}</div>
                    <div>{t('gameList.producer')}{getProducerNameFromId(game.producer)}</div>
                </div>
            </div>
            <div>
                <Link to={`/game/${game.id}`}>
                <button>
                    {t('gameList.moreBtn')}
                </button>
                </Link>
            </div>
        </li>) : 
        <li><div style={{"gridColumn": "span 5", "textAlign": "center"}}>{t('gameList.nothingFound')}</div></li>}
        </ul>
        </div>
        </>
    )
}

const mapStateToProps = (state, otherProps) => {
    const { match: { params: { phrase }}} = otherProps;
    return {
        games: getAllGames(state),
        phrase,
        producers: getAllProducers(state)
    }
}

export default withRouter(connect(mapStateToProps, null)(Search));