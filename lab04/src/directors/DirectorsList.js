import { connect } from "react-redux";
import { Link } from "react-router-dom";
import '../styles/movieTable.scss';


const DirectorsList = ({directors}, props) => {

    return (
        <div className="dashboard">
            <h3>Directors</h3>
            {directors.length === 0 ? <p>Directors database is empty</p> : 
                <div className="movieList">
                        <ul>
                            <li>Name</li>
                            <li>Surname</li>
                            <li>Age</li>
                        </ul>
                    {directors.sort(function(a, b) {
                            var textA = a.lastName.toUpperCase();
                            var textB = b.lastName.toUpperCase();
                            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                        }).map(director => 
                        <ul key={director.id}>
                            <li>{director.firstName} <Link to={`/directors/${director.id}`}>(details)</Link></li>
                            <li>{director.lastName}</li>
                            <li>{director.age}</li>
                        </ul>)
                    }
                </div>
                }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        directors: state.directors.list
    }
}

export default connect(mapStateToProps, null)(DirectorsList);