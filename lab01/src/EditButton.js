import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'

import { useState } from "react";
import { Redirect } from "react-router";

import { useHistory } from "react-router-dom";

const element = <FontAwesomeIcon icon={faPen} />

const EditButton = (props) => {

    const id = props.id;

    const [redirect, setRedirect] = useState(false);

    const inside = props.in;

    const history = useHistory();
    const routeChange = (id) =>{ 
        let path = inside === true ? `/edit` : `/products/${id}/edit`; 
        history.push(path);
    }

    return(
        <div>
            <div 
                className="edit"
                onClick={()=>{
                    setRedirect(true);
                }}
                >
                    {element}
                    {redirect === true ? routeChange(id) : null}
            </div>
        </div>
    )
}

export default EditButton;