export const addTodo = (id, title) => {
    return {
        type: 'ADD_TODO',
        payload: {
            id: id,
            title: title,
            done: false
        }
    }
}

export const deleteTodo = id => {
    return {
        type: 'DELETE_TODO',
        payload: {id: id}
    }
}

export const updateTodo = (id, title) => {
    return {
        type: 'UPDATE_TODO', 
        payload: {
            id: id, 
            title: title
        }
    }
}

export const finishTodo = id => {
    return {
        type: 'FINISH_TODO', 
        payload: {id: id}
    }
}

// export default addTodo;
// export default deleteTodo;
// export default updateTodo;
// export default finishTodo;