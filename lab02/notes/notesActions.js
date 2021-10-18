export const addNote = (id, content) => {
    return {
        type: "ADD_NOTE", 
        payload: {
            id: id, 
            content: content
        }
    }
}

export const deleteNote = id => {
    return {
        type: "DELETE_NOTE", 
        payload: {id: id}
    }
}