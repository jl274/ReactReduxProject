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
                <li>Test</li>
                {games ? games.map(game => 
                    <li key={game.id}>{game.name}</li>
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