import axios from "axios";
import { useEffect, useState } from "react";
import './styles/ProductList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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
        try {
            const deletionResult = await axios.delete(url + "products/" + id);
            if (deletionResult.status === 200){
                props.delete(id);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // opening confirmation
    const [activeId, setActiveId] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


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
                                onClick={async () => {
                                    setActiveId(elem.id);
                                    handleClickOpen();
                                    // deleteProduct(elem.id);
                                }}
                            >{element}</div>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                {"Are you sure you want to delete this product?"}
                                </DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    This action is permanent!
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={()=>{deleteProduct(activeId);handleClose();}} autoFocus>
                                    Delete
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </li>)}
            </ul>
        </div>

    )
};

export default ProductList;