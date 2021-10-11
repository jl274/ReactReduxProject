import axios from "axios";
import { useEffect, useState } from "react";
import './styles/ProductList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const element = <FontAwesomeIcon icon={faTrashAlt} />

const url = "https://fakestoreapi.com/"



const ProductList = (props) => {

    // const [productList, setProductList] = useState([]);
    const productList = props.productList;
    const setProductList = props.setProductList;

    // downloading products

    useEffect(()=>{

        async function fetchData(){
            try{
                const productListGot = await axios.get(url + "products");
                setProductList(productListGot.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // deleting product
    const deleteProduct = async (id) => {
        console.log('starting work');
        try {
            const deletionResult = await axios.delete(url + "products/" + id);
            console.log('yeah')
            if (deletionResult.status === 200){
                console.log(deletionResult);
                props.delete(id);
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="list">
            <ul>
                {productList && productList.map(elem => 
                    <li id={elem.id} key={elem.id}>
                        <div className="holder">
                            <img src={elem.image} alt="Product"></img>
                            <p>{elem.title}</p>
                            <p>{elem.price}$</p>
                            <div 
                                className="delete"
                                onClick={() => {deleteProduct(elem.id);}}
                            >{element}</div>
                        </div>
                    </li>)}
            </ul>
        </div>

    )
};

export default ProductList;