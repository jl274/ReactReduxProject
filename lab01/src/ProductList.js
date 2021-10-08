import axios from "axios";
import { useEffect, useState } from "react";
import './styles/ProductList.scss'

const url = "https://fakestoreapi.com/"

const ProductList = () => {

    const [productList, setProductList] = useState([]);

    useEffect(()=>{

        async function fetchData(){
        const productListGot = await axios.get(url + "products");
        setProductList(productListGot.data);
        };

        fetchData();
    }, []);



    return (
        <div className="list">
            <ul>
                {productList && productList.map(elem => 
                    <li id={elem.id} key={elem.id}>
                        <div>
                            <img src={elem.image} alt="Product"></img>
                            <p>{elem.title}</p>
                            <p>{elem.price}$</p>
                        </div>
                    </li>)}
            </ul>
        </div>

    )
};

export default ProductList;