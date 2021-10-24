import { connect } from "react-redux"
import {v4 as uuidv4} from 'uuid'
import {showToggle, hideToggle} from './toggling.js'

export const toDoListReducer = (state = {
    todos: [],
    editActive: null
}, action) => {

    switch(action.type){

        case 'ADD_TODO':
            return {...state, todos: [...state.todos, action.payload]};

        case 'TOGGLE_TODO':
            return {...state, todos: state.todos.map(x => {
                    if (x.id === action.payload.id) {
                        x.done = !x.done
                    }
                    return x
                })
            }

        case 'EDIT_TODO':
            return {...state, todos: state.todos.map(x => {
                if (x.id === action.payload.id){
                    x = action.payload
                }
                return x;
            })}

        case 'DELETE_TODO':
            return {...state, todos: state.todos.filter(x => x.id !== action.payload)}

        case 'SET_ACTIVE':
            return {...state, editActive: action.payload}

        default:
            return state;
    }
}

export const setActive = (payload) => {
    return {
        type: 'SET_ACTIVE',
        payload
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

export const deleteToDo = id => {
    return {
        type: 'DELETE_TODO',
        payload: id
    }
}

const ToDoList = ({ stateToDoList, toggleToDo, toggler, showToggle, hideToggle, setActive, deleteToDo },props) => {

    const onClickEdit = (todo) => {
        setActive(todo)
        toggler.edit ? hideToggle("edit") : showToggle("edit");
    }

    return (
        <div style={{margin: "10px 30vw"}}>
            <ul>
                {stateToDoList.map(todo => <li key={todo.id}>
                    <input type="checkbox" onClick={()=>toggleToDo(todo.id)}></input>
                    <ul style={{listStyle: "none"}}>
                        <li>Id: {todo.id}</li>
                        <li>Name: {todo.name}</li>
                        <li>Date: {todo.date.toLocaleDateString()}</li>
                        <li>Done: {todo.done.toString()}</li>
                        <li>
                            <button onClick={()=>onClickEdit(todo)}>{toggler.edit ? `Hide` : `Edit`}</button>
                            <button onClick={()=>deleteToDo(todo.id)}>Delete</button>
                        </li>
                    </ul>
                </li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        stateToDoList: state.list.todos,
        toggler: state.toggling
    }
} 

const mapDispatchToProps = {
    addTodo,
    showToggle,
    hideToggle,
    toggleToDo,
    setActive,
    deleteToDo
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)