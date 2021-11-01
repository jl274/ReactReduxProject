import { connect } from "react-redux";
import '../styles/movieTable.scss';


const MovieList = ({movies}, props) => {

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
                            <li>{movie.title}</li>
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

export default connect(mapStateToProps, null)(MovieList);