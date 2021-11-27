import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getCategoriesOperation, getInCategoryOperation, getProductsOperation } from "../../ducks/products/operations";
import { getProductsCategories, getProductsLits, getProductsLoading } from "../../ducks/products/selectors";
import '../../styles/List.scss';
import DeleteButton from "./DeleteButton";

const ProductsList = ({ products,  getProductsOperation, loading, getCategoriesOperation, categories, getInCategoryOperation }) => {

    useEffect(() => {
        if (products.length === 0){
            getProductsOperation();
            getCategoriesOperation();
        }
    }, [])

    // filtering
    const handleFiltering = (category) => {
        category === "all" ? getProductsOperation() : getInCategoryOperation(category);
    }

    return (
        <div className="list">
            <h3>Products List</h3>
            <div className="options">
                <div className="categories">Show: 
                    <select onChange={(val)=>handleFiltering(val.target.value)}>
                        <option value="all">All</option>
                        {categories.length !== 0 ? categories.map(category => 
                        <option key={category} value={category}>{category}</option>
                        ) : null}
                    </select>
                </div>
            </div>
            <ul>
                {products.length === 0 ? <li>{loading ? 'Loading...' : 'No products found'}</li> : products.map(product => 
                <li key={product.id}>
                    <Link to={`/products/${product.id}`}>{product.title}</Link>
                    <DeleteButton id={product.id} />
                </li>)}
            </ul>
            <Link to="/products/form"><button className="button1">Add new</button></Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: getProductsLits(state),
        loading: getProductsLoading(state),
        categories: getProductsCategories(state)
    }
}

const mapDispatchToProps = {
    getProductsOperation,
    getCategoriesOperation,
    getInCategoryOperation
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsList));