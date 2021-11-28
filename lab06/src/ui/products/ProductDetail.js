import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getOneProduct } from "../../ducks/products/operations";
import { getProductDetail, getProductsLoading } from "../../ducks/products/selectors";
import '../../styles/UserDetail.scss';

const ProductDetail = ({ id, product, loading, getOneProduct, history }, props) => {

    useEffect(()=>{
        if (product === false) {
            getOneProduct(id);
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
        loading: getProductsLoading(state)
    }
}

const mapDispatchToProps = {
    getOneProduct
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetail));