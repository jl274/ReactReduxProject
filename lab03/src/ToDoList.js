import { connect } from "react-redux"

export const toDoListReducer = (state = [
    {id: 1, name: "abc", date:"2020/10/10", done: false}
], action) => {

    switch(action.type){
        default:
            return state
    }
}

const ToDoList = ({ stateToDoList },props) => {


    return (
        <div>
            <ul>
                {stateToDoList.map(todo => <li key={todo.id}>
                    Id: {todo.id}
                    Name: {todo.name}
                    Date: {todo.date}
                    Done: {todo.done.toString()}
                    {console.log(todo)}
                </li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        stateToDoList: state.list
    }
} 

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)