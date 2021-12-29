import {connect} from 'react-redux';
import { getAllGames } from '../../ducks/games/selectors';
import { useTranslation } from 'react-i18next';
import '../../styles/GamesList.scss';
import { getAllProducers } from '../../ducks/producers/selectors';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { useState } from 'react';

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

    const [sortMethod, setSortMethod] = useState("new");

    const gamesToMap = () => {
        let games_copy = [...games]
        if (sortMethod === "new"){
            games_copy = _.reverse(games_copy)
        } else if (sortMethod === "leastTime"){
            games_copy = _.sortBy(games_copy, ['playingTime']);
        } else if (sortMethod === "mostTime"){
            games_copy = _.reverse(_.sortBy(games_copy, ['playingTime']));
        } else if (sortMethod === "leastComplex"){
            games_copy = _.sortBy(games_copy, ['complexity']);
        } else if (sortMethod === "mostComplex"){
            games_copy = _.reverse(_.sortBy(games_copy, ['complexity']));
        } else if (sortMethod === "az"){
            games_copy = _.sortBy(games_copy, ['name']);
        } else if (sortMethod === "za"){
            games_copy = _.reverse(_.sortBy(games_copy, ['name']));
        }
        console.log(games_copy)
        return games_copy
    }

    return (
        <>
        <div className='controlBox'>
            <h2>{t('gameList.h2')}</h2>
            <div className='sortOptions'>
                <p>Sort by:</p>
                <div>
                    <button className={`${sortMethod === "new" ? "active" : ""} left`} onClick={()=>{setSortMethod("new")}}>Newest</button>
                    <button className={`${sortMethod === "old" ? "active" : ""} right`} onClick={()=>{setSortMethod("old")}}>Oldest</button>
                </div>
                <div>
                    <button className={`${sortMethod === "az" ? "active" : ""} left`} onClick={()=>{setSortMethod("az")}}>{"A->Z"}</button>
                    <button className={`${sortMethod === "za" ? "active" : ""} right`} onClick={()=>{setSortMethod("za")}}>{"Z->A"}</button>
                </div>
                <div>
                    <button className={`${sortMethod === "leastTime" ? "active" : ""} left`} onClick={()=>{setSortMethod("leastTime")}}>Least playing time</button>
                    <button className={`${sortMethod === "mostTime" ? "active" : ""} right`} onClick={()=>{setSortMethod("mostTime")}}>Most playing time</button>
                </div>
                <div>
                    <button className={`${sortMethod === "leastComplex" ? "active" : ""} left`} onClick={()=>{setSortMethod("leastComplex")}}>Easiest</button>
                    <button className={`${sortMethod === "mostComplex" ? "active" : ""} right`} onClick={()=>{setSortMethod("mostComplex")}}>Most difficult</button>
                </div>
            </div>
            <div>
                <button><Link to='/new-game'>{t('gameList.add')} {plus}</Link></button>
            </div>
        </div>
        <div className='itemsList'>
            <ul>
                {games ? gamesToMap().map(game => 
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
        </>
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