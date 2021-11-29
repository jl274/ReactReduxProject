import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCartByUserId } from "../../ducks/cart/selectors";
import { getProductsOperation } from "../../ducks/products/operations";
import { getProductsLits } from "../../ducks/products/selectors";
import { getOneUser } from "../../ducks/users/operations";
import { getUserDetail, getUsersIsLoading } from "../../ducks/users/selectors";
import '../../styles/UserDetail.scss';

const UserDetail = ({ id, user, loading, getOneUser, history, userCart, products, getProductsOperation }, props) => {

    useEffect(()=>{
        if (user === false) {
            getOneUser(id);
        }
        if (products.length === 0){
            getProductsOperation();
        }
        console.log(userCart)
    }, [])

    const handleReturnButton = () => {
        history.push("/users");
    }

    return(
        <div className="userDetail">
            <button className="return" onClick={handleReturnButton}>← Return to list</button>
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
            {userCart ? 
                <ul className="cart">
                    <p>Cart</p>
                    {products.map(product => {
                        console.log("x")
                        console.log(userCart.products.find(x => `${x.productId}` === `${product.id}`))
                        if (userCart.products.find(x => `${x.productId}` === `${product.id}`)){
                            return <li>{product.title} (🛒{userCart.products.find(y => `${y.productId}` === `${product.id}`).quantity})</li>
                        } else {
                            return null
                        }
                    })}
                </ul> : null
            }
        </div>
    )
}

const mapStateToProps = (state, otherProps) => {

    const {match : {params: {id}}} = otherProps;

    return {
        id,
        user: getUserDetail(state, id) ? getUserDetail(state, id) : false,
        loading: getUsersIsLoading(state),
        userCart: getCartByUserId(state, id),
        products: getProductsLits(state)
    }
}

const mapDispatchToProps = {
    getOneUser,
    getProductsOperation
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetail));