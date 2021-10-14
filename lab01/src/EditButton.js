import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'

import { useState } from "react";
import { Redirect } from "react-router";

const element = <FontAwesomeIcon icon={faPen} />

const url = "https://fakestoreapi.com/"

const EditButton = (props) => {

    const id = props.id;

    const [redirect, setRedirect] = useState(false);

    return(
        <div>
            <div 
                className="edit"
                onClick={()=>{
                    setRedirect(true);
                }}
                >
                    {element}
                    {redirect === true ? <Redirect to={`products/${id}/edit`}/> : null}
            </div>
        </div>
    )
}

export default EditButton;