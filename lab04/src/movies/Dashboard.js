import { connect } from "react-redux";
import '../styles/movieTable.scss';


const Dashboard = ({directors, movies}, props) => {

    console.log("Directors");
    console.log(directors);
    console.log("Movies");
    console.log(movies);

    return (
        <div className="dashboard">
            <h3>Newest Movies</h3>
            {movies.length === 0 ? <p>No movies yet</p> : 
                <div className="movieList">
                        <ul>
                            <li>Title</li>
                            <li>Year</li>
                            <li>Director</li>
                        </ul>
                    {movies.sort((a,b)=>a.creationDate - b.creationDate).reverse().slice(0,3).map(movie => 
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
        directors: state.directors.list,
        movies: state.movies.list
    }
}

export default connect(mapStateToProps, null)(Dashboard);