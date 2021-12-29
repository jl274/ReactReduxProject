import {connect} from 'react-redux';
import { getAllGames } from '../../ducks/games/selectors';
import { useTranslation } from 'react-i18next';
import '../../styles/GamesList.scss';
import { getAllProducers } from '../../ducks/producers/selectors';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const plus = <FontAwesomeIcon icon={faPlus} />


const GamesList = ({games, producers}) => {

    const { t } = useTranslation();
    const noCoverSrc = 'https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1';

    const getProducerNameFromId = (id) => {
        if (producers){
        return producers.find(x => x.id === id).name;
        } else {
            return "Error occured"
        }
    }

    return (
        <div className='itemsList'>
            <h2>{t('gameList.h2')}</h2>
            <div>
                <button><Link to='/new-game'>{t('gameList.add')} {plus}</Link></button>
            </div>
            <ul>
                {games ? games.map(game => 
                    <li key={game.id}>
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
                    </li>
                ) : null}
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        games: getAllGames(state),
        producers: getAllProducers(state)
    }
}

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(GamesList);