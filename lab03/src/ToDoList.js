import { connect } from "react-redux"
import {v4 as uuidv4} from 'uuid'
import {showToggle, hideToggle} from './toggling.js'

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

        case 'EDIT_TODO':
            return [...state.map(x => {
                if (x.id === action.payload.id) {
                    return {...x, ...action.payload}
                } else {
                    return x
                }
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
            done: false,
            showEdit: false
        }
    }
}

export const toggleToDo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        payload: {id}
    }
}

export const editToDo = (payload) => {
    return {
        type: 'EDIT_TODO',
        payload
    }
}

const ToDoList = ({ stateToDoList, toggleToDo, toggler, showToggle, hideToggle },props) => {

    const onClickEdit = () => {
        toggler.edit ? hideToggle("edit") : showToggle("edit")
    }

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
                        <li><button onClick={onClickEdit}>{toggler.edit ? `Hide` : `Edit`}</button></li>
                    </ul>
                </li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        stateToDoList: state.list,
        toggler: state.toggling
    }
} 

const mapDispatchToProps = {
    addTodo,
    showToggle,
    hideToggle
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)