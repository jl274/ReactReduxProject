import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { useState } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const element = <FontAwesomeIcon icon={faTrashAlt} />

const url = "https://fakestoreapi.com/"

const DeleteButton = (props) => {

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

    return(
        <div>
            <div 
                className="delete"
                onClick={async () => {
                setActiveId(props.id);
                handleClickOpen();
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
    )
}

export default DeleteButton;