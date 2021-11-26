import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getProductsOperation } from "../../ducks/products/operations";
import { getProductsLits, getProductsLoading } from "../../ducks/products/selectors";
import '../../styles/List.scss';

const ProductsList = ({ products,  getProductsOperation, loading }) => {

    useEffect(() => {
        if (products.length === 0){
            getProductsOperation();
        }
    }, [])

    return (
        <div className="list">
            <h3>Products List</h3>
            <ul>
                {products.length === 0 ? <li>{loading ? 'Loading...' : 'No products found'}</li> : products.map(product => 
                <li key={product.id}>
                    <Link to={`/products/${product.id}`}>{product.title}</Link>
                </li>)}
            </ul>
            <Link to="/products/form"><button>Add new</button></Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: getProductsLits(state),
        loading: getProductsLoading(state)
    }
}

const mapDispatchToProps = {
    getProductsOperation
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsList));