import { connect } from "react-redux"
import {v4 as uuidv4} from 'uuid';

export const toDoListReducer = (state = [
    {id: 1, name: "abc", date: new Date("2020/10/10"), done: false}
], action) => {

    switch(action.type){

        case 'ADD_TODO':
            return [...state, action.payload];

        case 'TOGGLE_TODO':
            return [...state.map(x => {
                if (x.id === action.payload.id) {
                    x.done = !x.done
                }
                return x
            })]

        default:
            return state;
    }
}

export const addTodo = (name, date) => {
    return {
        type: 'ADD_TODO',
        payload: {
            id: uuidv4(),
            name,
            date: new Date(date),
            done: false
        }
    }
}

export const toggleToDo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        payload: {id}
    }
}

const ToDoList = ({ stateToDoList, toggleToDo },props) => {


    return (
        <div style={{margin: "10px 30vw"}}>
            <ul>
                {stateToDoList.map(todo => <li key={todo.id}>
                    <input type="checkbox" onClick={()=>toggleToDo(todo.id)}></input>
                    <ul>
                        <li>Id: {todo.id}</li>
                        <li>Name: {todo.name}</li>
                        <li>Date: {todo.date.toLocaleDateString()}</li>
                        <li>Done: {todo.done.toString()}</li>
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
    addTodo,
    toggleToDo
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)