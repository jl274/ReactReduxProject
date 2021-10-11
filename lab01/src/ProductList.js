import axios from "axios";
import { useEffect} from "react";
import DeleteButton from "./DeleteButton";
import './styles/ProductList.scss';

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

    


    return (
        <div className="list">
            <ul>
                {productList && productList.map(elem => 
                    <li id={elem.id} key={elem.id}>
                        <div className="holder">
                            <img src={elem.image} alt="Product"></img>
                            <p>{elem.title}</p>
                            <p>{elem.price}$</p>
                            <DeleteButton delete={props.delete} id={elem.id}/>
                        </div>
                    </li>)}
            </ul>
        </div>

    )
};

export default ProductList;