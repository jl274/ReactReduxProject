import { useEffect } from 'react';
import {connect} from 'react-redux';
import { getGamesFromDB } from '../../ducks/games/operations';


const GamesList = ({getGamesFromDB}) => {

    useEffect(() => {
        getGamesFromDB()
    }, [getGamesFromDB]);

    return (
        <div>
            Test
        </div>
    )
};

const mapDispatchToProps = {
    getGamesFromDB
}


export default connect(null, mapDispatchToProps)(GamesList);