import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { toggleToDo, setActive, deleteToDo } from './ToDoList';
import { showToggle, hideToggle} from './toggling';

const ToDoDetail = ({ thatToDo, history, showToggle, toggler,
    hideToggle,
    toggleToDo,
    setActive,
    deleteToDo }) => {

    const onClickEdit = (todo) => {
        setActive(todo)
        toggler.edit ? hideToggle("edit") : showToggle("edit");
    }

    return (
        <div style={thatToDo[0].done ? {backgroundColor: "lightgreen"} : {backgroundColor: "orange"}}>
            <p onClick={()=>history.goBack()} style={{color: "blue", cursor: "pointer"}}>Wróć</p>
            <h2>{thatToDo[0].name}</h2>
            <ul>
                <li>Id: {thatToDo[0].id}</li>
                <li>Date: {thatToDo[0].date.toLocaleDateString()}</li>
                <li>
                    Done: {thatToDo[0].done ? "True" : "False"} 
                    <input type="checkbox" checked={thatToDo.done} onChange={()=>{toggleToDo(thatToDo[0].id)}}></input>
                </li>
                <li>
                            <button onClick={()=>onClickEdit(thatToDo[0])}>{toggler.edit ? `Hide` : `Edit`}</button>
                            {/* <button onClick={()=>{history.goBack();deleteToDo(thatToDo[0].id)}}>Delete</button> */}
                </li>
            </ul>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { match: {params: {id}} } = ownProps;
    return {
        thatToDo: state.list.todos.filter(x => x.id === id),
        toggler: state.toggling
    }
}

const mapDispatchToProps = {
    showToggle,
    hideToggle,
    toggleToDo,
    setActive,
    deleteToDo
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ToDoDetail));