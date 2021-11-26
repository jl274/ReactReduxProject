import { connect } from "react-redux";
import { deleteProductOperation } from "../../ducks/products/operations";
import '../../styles/Button.scss';

const DeleteButton = ({ id, deleteProductOperation }) => {

    const handleDelete = () => {
        deleteProductOperation(id);
    }

    return (
        <button className="button1" onClick={handleDelete}>Delete</button>
    )
}

const mapStateToProps = (state, otherProps) => {

    const { id } = otherProps;

    return {
        id
    }
}

const mapDispatchToProps = {
    deleteProductOperation
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);