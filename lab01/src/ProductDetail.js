import { withRouter } from "react-router";
import './styles/ProductDetail.scss';

const ProductDetails = (props) => {

    const givenId = props.match.params.id;

    const productInfo = props.appUserList.filter(x => parseInt(x.id) === parseInt(givenId))[0]
    console.log(productInfo)

    return (
        <div>
        <h3>{productInfo.title}</h3>
        <div className="detailbox">
            
            <div className="left">
                <img src={`${productInfo.image}`} alt={`${productInfo.title}`}/>
            </div>
            <div className="right">
                <ul>
                    <li>Rating: {productInfo.rating.rate}</li>
                    <li>{productInfo.price}</li>
                    <li>{productInfo.category}</li>
                    <li>{productInfo.description}</li>
                </ul>
            </div>
        </div>
        </div>
    )
}

export default withRouter(ProductDetails);