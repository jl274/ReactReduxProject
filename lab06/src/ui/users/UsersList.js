import { useEffect } from "react";
import { connect } from "react-redux";
import { getUsersOperation } from "../../ducks/users/operations";
import { getUsers, getUsersIsLoading } from "../../ducks/users/selectors";
import '../../styles/UsersList.scss';

const UsersList = ({ usersList, loadingUsers, getUsersOperation }, props) => {

    useEffect(()=>{
        if (usersList.length === 0){
            getUsersOperation();
        }
    }, [])

    return (
        <div className="usersList">
            <h3>UsersList</h3>
            <ul>
                {usersList.length === 0 ? <li>{loadingUsers ? 'Loading...' : 'No users found'}</li> : usersList.map(user => 
                <li key={user.id}>
                    {user.username}
                </li>)}
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        usersList: getUsers(state),
        loadingUsers: getUsersIsLoading(state)
    }
}

const mapDispatchToProps = {
    getUsersOperation
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);