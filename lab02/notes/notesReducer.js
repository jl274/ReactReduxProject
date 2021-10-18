function notesReducer (state = {notes: []}, action) {
    switch(action.type){

        case 'ADD_NOTE':
            return {...state, notes: [...state.notes, action.payload]};

        case 'DELETE_NOTE':
            return {...state, notes: state.notes.filter(x => x.id !== action.payload.id)};

        default:
            return state;
    }
}

export default notesReducer;