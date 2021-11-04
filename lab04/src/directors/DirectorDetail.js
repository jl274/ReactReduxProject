import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom";
import '../styles/directorDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

const editIcon = <FontAwesomeIcon icon={faEdit} />;


const DirectorDetail = ({director}, props) => {

    return(
        <div className="directorDetail">
            <div className="edit"><Link to={`/directors/${director.id}/edit`}>{editIcon}</Link></div>
            <div className="detailsList">
                <ul>
                    <li className="lastName last"><p>{director.lastName}</p></li>
                    <li className="label">Name: </li><li>{director.firstName}</li>
                    <li className="label">Age: </li><li>{director.age}</li>
                    <li className="label last">Country: </li><li className="last">{director.country}</li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state, otherProps) => {
    const { match: {params: {id}} } = otherProps;
    return {
        director: state.directors.list.find(x => x.id === id)
    }
}

export default withRouter(connect(mapStateToProps, null)(DirectorDetail));