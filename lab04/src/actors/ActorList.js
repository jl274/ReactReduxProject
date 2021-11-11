import { connect } from "react-redux";
import { Link } from "react-router-dom";
import '../styles/movieTable.scss';


const ActorList = ({actors}, props) => {

    return (
        <div className="dashboard">
            <h3>Actors</h3>
            {actors.length === 0 ? <p>Directors database is empty</p> : 
                <div className="movieList">
                        <ul>
                            <li>Name</li>
                            <li>Surname</li>
                            <li>Age</li>
                        </ul>
                    {actors.sort(function(a, b) {
                            var textA = a.lastName.toUpperCase();
                            var textB = b.lastName.toUpperCase();
                            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                        }).map(actor => 
                        <ul key={actor.id}>
                            <li>{actor.firstName} <Link to={`/actors/${actor.id}`}>(details)</Link></li>
                            <li>{actor.lastName}</li>
                            <li>{actor.age}</li>
                        </ul>)
                    }
                </div>
                }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        actors: state.actors.list
    }
}

export default connect(mapStateToProps, null)(ActorList);