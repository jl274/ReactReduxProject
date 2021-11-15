import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
import '../styles/actorDetail.scss';

const ActorDetail = ({actor}, props) => {

    return(
        <div className="box">
        <div className="movie">
            <ul>
                <li className="title">Personal data</li>
                <li className="label">Name</li><li>{actor.firstName}</li>
                <li className="label">Surname</li><li>{actor.lastName}</li>
                <li className="label">Country</li><li>{actor.country}</li>
                <li className="title">Movies</li>
                <li className="movieFlex">
                    {actor.movies.length === 0 ? 
                    `No movies yet` :
                    actor.movies.map(movie => <div className="actorMovie" key={movie}>{movie}</div>)}
                </li>
            </ul>
        </div>
    </div>
    )
}

const mapStateToProps = (state, otherProps) => {
    const { match: {params: {id}} } = otherProps;
    return {
        actor: state.actors.list.find(x => x.id === id)
    }
}

export default withRouter(connect(mapStateToProps, null)(ActorDetail));