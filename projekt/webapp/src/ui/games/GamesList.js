import { useEffect } from 'react';
import {connect} from 'react-redux';
import { getGamesFromDB } from '../../ducks/games/operations';
import { getAllGames } from '../../ducks/games/selectors';
import '../../styles/GamesList.scss';


const GamesList = ({games, getGamesFromDB}) => {

    useEffect(() => {
        getGamesFromDB()
    }, [getGamesFromDB]);

    return (
        <div className='itemsList'>
            <h2>Games</h2>
            <ul>
                {games ? games.map(game => 
                    <li key={game.id}>
                        <div className='img'>
                            <img src={game.url} alt='Cover' ></img>
                        </div>
                        <div className='info'>
                            <div className='gameName'>{game.name}</div>
                            <div className='otherInfo'>
                                <div>Genre: {game.genre}</div>
                                <div>Producer: {game.producer}</div>
                            </div>
                        </div>
                        <div>More</div>
                    </li>
                ) : null}
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        games: getAllGames(state)
    }
}

const mapDispatchToProps = {
    getGamesFromDB
}


export default connect(mapStateToProps, mapDispatchToProps)(GamesList);