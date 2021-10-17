import axios from "axios";
import { useEffect, useState} from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import './styles/ProductList.scss';
import { useHistory } from "react-router-dom";

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

        if (productList.length === 0){
            fetchData();
        }
    }, [productList.length, setProductList]);

    // redirect to edit
    const history = useHistory();

    const routeChange = (id) =>{ 
        let path = `/products/${id}`; 
        history.push(path);
    }


    return (
        <div className="list">
            <ul>
                {productList && productList.map(elem => 

                    <li id={elem.id} key={elem.id}>
                        <div onClick={()=>{routeChange(elem.id)}} >
                            <div className="holder">
                                <img src={elem.image} alt="Product"></img>
                                <p>{elem.title}</p>
                                <p>{elem.price}$</p>
                                
                            </div>
                        </div>
                        <DeleteButton delete={props.delete} id={elem.id}/>
                        <EditButton id={elem.id} inside={false}/>
                    </li>
                    )}
                    
            </ul>
        </div>

    )
};

export default ProductList;