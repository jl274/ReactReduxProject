import { connect } from "react-redux"

export const toDoListReducer = (state = [
    {id: 1, name: "abc", date: new Date("2020/10/10"), done: false}
], action) => {

    switch(action.type){

        case 'ADD_TODO':
            return {...state, ...action.payload}

        default:
            return state
    }
}

const addTodo = (id, name, date) => {
    return {
        type: 'ADD_TODO',
        payload: {
            id,
            name,
            date: new Date(date),
            done: false
        }
    }
}

const ToDoList = ({ stateToDoList },props) => {


    return (
        <div style={{margin: "10px 30vw"}}>
            <ul>
                {stateToDoList.map(todo => <li key={todo.id}>
                    <ul>
                        <li>Id: {todo.id}</li>
                        <li>Name: {todo.name}</li>
                        <li>Date: {todo.date.toLocaleDateString()}</li>
                        <li>Done: {todo.done.toString()}</li>
                    {console.log(todo)}
                    </ul>
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