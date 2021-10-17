import axios from "axios";
import { useEffect} from "react";
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

    // redirect
    const history = useHistory();

    const routeChange = (id) =>{ 
        let path = `/products/${id}`; 
        history.push(path);
    }

    return (
        <div className="list">
            <ul>
                {productList && productList.map(elem => 
                    // <Link to={`/products/${elem.id}`} id={elem.id} key={elem.id}>
                        <li onClick={()=>{routeChange(elem.id)}} id={elem.id} key={elem.id}>
                            <div className="holder">
                                <img src={elem.image} alt="Product"></img>
                                <p>{elem.title}</p>
                                <p>{elem.price}$</p>
                                <DeleteButton delete={props.delete} id={elem.id}/>
                                <EditButton id={elem.id}/>
                            </div>
                        </li>
                    // </Link>
                    )}
                    
            </ul>
        </div>

    )
};

export default ProductList;