import { connect } from "react-redux";
import '../styles/movieTable.scss';


const Dashboard = ({directors, movies, actors}, props) => {


    // I leave it here in order to future tests and debugging
    // console.log("Directors");
    // console.log(directors);
    // console.log("Movies");
    // console.log(movies);
    // console.log("Actors");
    // console.log(actors);

    return (
        <div>
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
            <div className="dashboard">
            <h3>Top movies</h3>
            {movies.length === 0 ? <p>No movies yet</p> : 
                <div className="topList">
                        <ul>
                            <li>Title</li>
                            {/* <li>Director</li> */}
                            <li>Actors number</li>
                        </ul>
                    {movies.sort((a,b)=>a.actors.length- b.actors.length).reverse().slice(0,3).map(movie => 
                        <ul key={movie.id}>
                            <li>{movie.title}</li>
                            {/* <li>{movie.director}</li> */}
                            <li>{movie.actors.length}</li>
                        </ul>)
                    }
                </div>
            }
            </div>
            <div className="dashboard">
            <h3>Top actors</h3>
            {movies.length === 0 ? <p>No actors yet</p> : 
                <div className="topList">
                        <ul>
                            <li>Name</li>
                            {/* <li>Director</li> */}
                            <li>Movies number</li>
                        </ul>
                    {actors.sort((a,b)=>a.movies.length- b.movies.length).reverse().slice(0,3).map(actor => 
                        <ul key={actor.id}>
                            <li>{actor.lastName} {actor.firstName}</li>
                            {/* <li>{movie.director}</li> */}
                            <li>{actor.movies.length}</li>
                        </ul>)
                    }
                </div>
            }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        directors: state.directors.list,
        movies: state.movies.list,
        actors: state.actors.list
    }
}

export default connect(mapStateToProps, null)(Dashboard);