import {connect} from 'react-redux';
import { getAllGames, getAllGenres } from '../../ducks/games/selectors';
import { useTranslation } from 'react-i18next';
import '../../styles/GamesList.scss';
import { getAllProducers } from '../../ducks/producers/selectors';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { togglerStatus } from '../../ducks/toggler/selectors';
import { hideToggle, showToggle } from '../../ducks/toggler/actions';

const plus = <FontAwesomeIcon icon={faPlus} />;
const searchIcon = <FontAwesomeIcon icon={faSearch} />;
const toggleOnIcon = <FontAwesomeIcon icon={faChevronUp} />;
const toggleOffIcon = <FontAwesomeIcon icon={faChevronDown} />;


const GamesList = ({games, producers, checkboxesStatus, hideToggle, showToggle, genres}) => {

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
    const [filterOptions, setFilterOptions] = useState({maxComplexity: null});

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

        if (filterOptions.maxComplexity){
            games_copy = games_copy.filter(game => parseInt(game.complexity) <= filterOptions.maxComplexity);
        }
        if (filterOptions.checked && filterOptions.checked.length !== 0){
            games_copy = games_copy.filter(game => filterOptions.checked.includes(game.genre));
        }

        console.log(games_copy)
        return games_copy
    }
    console.log("show/hide", checkboxesStatus)
    return (
        <>
        <div className='controlBox'>

            <h2>{t('gameList.h2')}</h2>

            <div className='sortOptions'>
                <p>Sort by:</p>
                <div>
                    <button className={`${sortMethod === "new" ? "active" : ""} left`} onClick={()=>{setSortMethod("new")}}>{t('gameList.sorts.newest')}</button>
                    <button className={`${sortMethod === "old" ? "active" : ""} right`} onClick={()=>{setSortMethod("old")}}>{t('gameList.sorts.oldest')}</button>
                </div>
                <div>
                    <button className={`${sortMethod === "az" ? "active" : ""} left`} onClick={()=>{setSortMethod("az")}}>{"A->Z"}</button>
                    <button className={`${sortMethod === "za" ? "active" : ""} right`} onClick={()=>{setSortMethod("za")}}>{"Z->A"}</button>
                </div>
                <div>
                    <button className={`${sortMethod === "leastTime" ? "active" : ""} left`} onClick={()=>{setSortMethod("leastTime")}}>{t('gameList.sorts.leastPlaying')}</button>
                    <button className={`${sortMethod === "mostTime" ? "active" : ""} right`} onClick={()=>{setSortMethod("mostTime")}}>{t('gameList.sorts.mostPlaying')}</button>
                </div>
                <div>
                    <button className={`${sortMethod === "leastComplex" ? "active" : ""} left`} onClick={()=>{setSortMethod("leastComplex")}}>{t('gameList.sorts.easiest')}</button>
                    <button className={`${sortMethod === "mostComplex" ? "active" : ""} right`} onClick={()=>{setSortMethod("mostComplex")}}>{t('gameList.sorts.mostDifficult')}</button>
                </div>
            </div>

            <div className='filterOptions'>
                <p>{t('gameList.filters.title')}</p>
                <Formik
                    initialValues={{maxComplexity: 100, checked: []}}
                    onSubmit={values=>setFilterOptions({
                        ...filterOptions, 
                        checked: values.checked, 
                        maxComplexity: parseInt(values.maxComplexity)
                    })}
                >
                    {({values}) => 
                        <Form id='filters'>
                            <div className='rangeBox'>
                                <p>{t('gameList.filters.max')}</p>
                                <Field name="maxComplexity" type="range" min="0" max="100"></Field>
                                <p>{values.maxComplexity}/100</p>
                            </div>
                            <div className='genresBox'>
                                <div className='flex'>
                                Genres: {checkboxesStatus ? 
                                    <p className='icon' onClick={()=>{hideToggle('checkboxes')}}>{toggleOnIcon}</p> :
                                    <p className='icon' onClick={()=>{showToggle('checkboxes')}} >{toggleOffIcon}</p>
                                }
                                </div>
                                {checkboxesStatus 
                                    ? <div className='genres'>{genres ? genres.map(genre => 
                                        <label key={genre}>
                                        <Field type="checkbox" name="checked" value={`${genre}`} />
                                        {genre}
                                        </label>
                                ) : null}</div> :
                                    null
                                }
                            </div>
                        </Form>
                    }
                </Formik>
                <div className='submit'><button type="submit" form='filters'>Use filters {searchIcon}</button></div>
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
        producers: getAllProducers(state),
        checkboxesStatus: togglerStatus(state, "checkboxes"),
        genres: getAllGenres(state)
    }
}

const mapDispatchToProps = {
    hideToggle,
    showToggle
}


export default connect(mapStateToProps, mapDispatchToProps)(GamesList);