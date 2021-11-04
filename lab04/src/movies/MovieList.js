import { connect } from "react-redux";
import '../styles/movieTable.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { deleteMovie } from '../actions/movieActions'
import { Link } from "react-router-dom";

const trashIcon = <FontAwesomeIcon icon={faTrashAlt} />;

const MovieList = ({movies, deleteMovie}, props) => {

    const handleDeleteButton = (id) => {
        deleteMovie(id);
    }

    return (
        <div className="dashboard">
            <h3>Movie List</h3>
            {movies.length === 0 ? <p>No movies yet</p> : 
                <div className="movieList">
                        <ul>
                            <li>Title</li>
                            <li>Year</li>
                            <li>Director</li>
                        </ul>
                    {movies.sort((a,b)=>a.creationDate - b.creationDate).reverse().map(movie => 
                        <ul key={movie.id}>
                            <li>
                                <div className="deleteIcon" onClick={()=>handleDeleteButton(movie.id)}>{trashIcon}</div>
                                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>      
                            </li>
                            <li>{movie.productionYear}</li>
                            <li>{movie.director}</li>
                        </ul>)
                    }
                </div>
                }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies.list
    }
}

const mapDispatchToProps = {
    deleteMovie
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);