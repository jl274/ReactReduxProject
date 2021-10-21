import { withRouter } from "react-router";
import { Redirect } from 'react-router-dom';
import './styles/ProductDetail.scss';
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const ProductDetails = (props) => {

    const givenId = props.match.params.id;

    const [productInfo, setProductInfo] = useState({
        id: 0,
        title: "",
        image: "",
        price: 0,
        category: "",
        description: "",
        rating: {rate: 0}
    });
    const productInfoList = props.appUserList.filter(x => parseInt(x.id) === parseInt(givenId))
    
    useEffect(()=>{
        async function getProduct(){
            if (productInfoList.length === 0){
                const result = await axios.get(`https://fakestoreapi.com/products/${givenId}`);
                setProductInfo(result.data)
            } else {
                setProductInfo(productInfoList[0])
            }
        }
        getProduct()
    },[givenId, productInfoList, props.appUserList])

    //redirect after delete
     const [deleteRedirect, setDeleteRedirect] = useState(false);

    return (
        <div>
        <h3>{productInfo.title}</h3>
        <div className="detailbox">
            
            <div className="left">
                <img src={`${productInfo.image}`} alt={`${productInfo.title}`}/>
            </div>
            <div className="right">
                <ul>
                    <li className="actions">
                        <p>Edit</p>
                        <EditButton id={productInfo.id} inside={false}/>
                        <p>Delete</p>
                        <DeleteButton delete={props.delete} id={productInfo.id} />
                    </li>
                    <li><h4>Rating: </h4>{productInfo.rating ? productInfo.rating.rate : "not rated yet"}</li>
                    <li><h4>Price: </h4>{productInfo.price}$</li>
                    <li><h4>Category: </h4>{productInfo.category}</li>
                    <li><h4>Description: </h4><p>{productInfo.description}</p></li>

                </ul>
            </div>
        </div>
        </div>
    )
}

export default withRouter(ProductDetails);