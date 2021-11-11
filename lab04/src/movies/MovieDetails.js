import { connect } from "react-redux"
import { withRouter } from "react-router";
import '../styles/movieDetails.scss';

const MovieDetails = ({movie, director}, props) => {

    return (
        <div className="box">
            <div className="movie">
                <ul>
                    <li className="title">Movie</li>
                    <li className="label">Title</li><li>{movie.title}</li>
                    <li className="label">Year</li><li>{movie.productionYear}</li>
                    <li className="title">Director</li>
                    <li className="label">Name</li><li>{director.firstName}</li>
                    <li className="label">Surname</li><li>{director.lastName}</li>
                    <li className="label">Age</li><li>{director.age}</li>
                    <li className="title">Actors</li>
                    <li className="actorFlex">
                        {movie.actors.length === 0 ? 
                        `No actors added yet` :
                        movie.movies.map(actor => <div>test</div>)}
                    </li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state, otherProps) => {
    const { match: {params: {id}} } = otherProps;
    return {
        movie: state.movies.list.find(x => x.id === id),
        director: state.directors.list.find(x => `${x.firstName} ${x.lastName}` === state.movies.list.find(x => x.id === id).director)
    }
}

export default withRouter(connect(mapStateToProps, null)(MovieDetails));