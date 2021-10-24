import { connect } from "react-redux";
import { withRouter } from "react-router-dom"

const ToDoDetail = ({ thatToDo }) => {

    // const readId = props.match.params.id;

    return (
        <div>
            {thatToDo.id}
            {console.log(thatToDo)}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { match: {params: {id}} } = ownProps;
    return {
        thatToDo: state.list.todos.filter(x => x.id === id)[0]
    }
}

export default withRouter(connect(mapStateToProps,null)(ToDoDetail));