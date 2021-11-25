import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserDetail } from "../../ducks/users/selectors";
import '../../styles/UserDetail.scss';

const UserDetail = ({ user }, props) => {

    return(
        <div className="userDetail">
            <h4>{user.username}</h4>
            <ul>
                <label>Name</label>
                <li>{user.name.firstname} {user.name.lastname}</li>

                <label>Email</label>
                <li>{user.email}</li>

                <label>City</label>
                <li>{user.address.city}</li>

                <label>Phone</label>
                <li>{user.phone}</li>
            </ul>
        </div>
    )
}

const mapStateToProps = (state, otherProps) => {

    const {match : {params: {id}}} = otherProps;

    return {
        user: getUserDetail(state, id)
    }
}

export default withRouter(connect(mapStateToProps, null)(UserDetail));