import {connect} from 'react-redux';
import { getAllGames } from '../../ducks/games/selectors';
import { useTranslation } from 'react-i18next';
import '../../styles/GamesList.scss';
import { getAllProducers } from '../../ducks/producers/selectors';


const GamesList = ({games, producers}) => {

    const { t } = useTranslation();

    const getProducerNameFromId = (id) => {
        return producers.find(x => x.id === id).name;
    }

    return (
        <div className='itemsList'>
            <h2>{t('gameList.h2')}</h2>
            <ul>
                {games ? games.map(game => 
                    <li key={game.id}>
                        <div className='img'>
                            <img src={game.url} alt='Cover' ></img>
                        </div>
                        <div className='info'>
                            <div className='gameName'>{game.name}</div>
                            <div className='otherInfo'>
                                <div>{t('gameList.genre')}{game.genre}</div>
                                <div>{t('gameList.producer')}{getProducerNameFromId(game.producer)}</div>
                            </div>
                        </div>
                        <div>
                            <button>
                                {t('gameList.moreBtn')}
                            </button>
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