import { useEffect } from 'react';
import {connect} from 'react-redux';
import { getGamesFromDB } from '../../ducks/games/operations';
import '../../styles/GamesList.scss';


const GamesList = ({getGamesFromDB}) => {

    useEffect(() => {
        getGamesFromDB()
    }, [getGamesFromDB]);

    return (
        <div className='itemsList'>
            <h2>Games</h2>
            <ul>
                <li>Test</li>
            </ul>
        </div>
    )
};

const mapDispatchToProps = {
    getGamesFromDB
}


export default connect(null, mapDispatchToProps)(GamesList);