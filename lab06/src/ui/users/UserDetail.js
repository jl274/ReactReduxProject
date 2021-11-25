import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getOneUser } from "../../ducks/users/operations";
import { getUserDetail, getUsersIsLoading } from "../../ducks/users/selectors";
import '../../styles/UserDetail.scss';

const UserDetail = ({ id, user, loading, getOneUser }, props) => {

    useEffect(()=>{
        if (user === false) {
            getOneUser(id);
        }
    }, [])

    return(
        <div className="userDetail">
            <h4>{user.username}</h4>
            {user ? <ul>
                    <label>Name</label>
                    <li>{user.name.firstname} {user.name.lastname}</li>

                    <label>Email</label>
                    <li>{user.email}</li>

                    <label>City</label>
                    <li>{user.address.city}</li>

                    <label>Phone</label>
                    <li>{user.phone}</li>
                </ul> : <p>{loading ? 'Loading' : 'User not found'}</p>
            }
        </div>
    )
}

const mapStateToProps = (state, otherProps) => {

    const {match : {params: {id}}} = otherProps;

    return {
        id,
        user: getUserDetail(state, id) ? getUserDetail(state, id) : false,
        loading: getUsersIsLoading(state)
    }
}

const mapDispatchToProps = {
    getOneUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetail));