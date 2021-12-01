import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getOneProduct } from "../../ducks/products/operations";
import { getProductDetail, getProductsLoading } from "../../ducks/products/selectors";
import { getCartsOperation } from "../../ducks/cart/operations";
import '../../styles/UserDetail.scss';
import { getAllCarts } from "../../ducks/cart/selectors";

const ProductDetail = ({ id, product, loading, getOneProduct, history, getCartsOperation, carts }, props) => {

    useEffect(()=>{
        if (product === false) {
            getOneProduct(id);
        }
        if (carts.length === 0){
            getCartsOperation()
        }
    }, [])

    const handleReturnButton = () => {
        history.push("/products");
    }

    return(
        <div className="userDetail">
            <button className="return" onClick={handleReturnButton}>← Return to list</button>
            <h4>{product ? product.title : 'Not found'}</h4>
            {product ? <ul>
                    <label>Title</label>
                    <li>{product.title}</li>

                    <label>Price</label>
                    <li>${product.price}</li>

                    <label>Category</label>
                    <li>{product.category}</li>

                    <label>Description</label>
                    <li>{product.description}</li>

                    <label>In carts</label>
                    <li>
                    {carts ? `${carts.reduce((prev, curr) => {
                            return prev + curr.products.reduce((prev2, curr2)=>{
                            if (curr2.productId == id){
                                return prev2 + 1
                            } else {
                                return prev2
                            }
                            }, 0) 
                        }, 0)}` : null
                    }
                    </li>
                </ul> : <p>{loading ? 'Loading' : 'User not found'}</p>
            }
            <div className="img">
                {product.image !== "" ? <img src={product.image} alt={product.title}></img> : "Image not included"}
            </div>
        </div>
    )
}

const mapStateToProps = (state, otherProps) => {

    const {match : {params: {id}}} = otherProps;

    return {
        id,
        product: getProductDetail(state, id) ? getProductDetail(state, id) : false,
        loading: getProductsLoading(state),
        carts: getAllCarts(state)
    }
}

const mapDispatchToProps = {
    getOneProduct,
    getCartsOperation
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetail));