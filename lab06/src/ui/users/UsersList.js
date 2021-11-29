import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getCartsOperation } from "../../ducks/cart/operations";
import { getUsersOperation } from "../../ducks/users/operations";
import { getUsers, getUsersIsLoading } from "../../ducks/users/selectors";
import '../../styles/List.scss';

const UsersList = ({ usersList, loadingUsers, getUsersOperation, getCartsOperation, history }, props) => {

    useEffect(()=>{
        if (usersList.length === 0){
            getUsersOperation();
            
        }
        getCartsOperation();
    }, [])

    const handleReturn = () => {
        history.push("/");
    }

    return (
        <div className="list">
            <button className="return" onClick={handleReturn}>Dashboard</button>
            <h3>UsersList</h3>
            <ul>
                {usersList.length === 0 ? <li>{loadingUsers ? 'Loading...' : 'No users found'}</li> : usersList.map(user => 
                <li key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.username}</Link>
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
    getUsersOperation,
    getCartsOperation
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersList));