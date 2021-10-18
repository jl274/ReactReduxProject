function toDoReducer(state = {toDos: []}, action) {
    switch(action.type){

        case 'ADD_TODO':
            return {...state, toDos: [...state.toDos, action.payload]};

        case 'DELETE_TODO':
            return {...state, toDos: state.toDos.filter(x => x.id !== action.payload.id)};

        case 'UPDATE_TODO':
            return {...state, toDos: state.toDos.map(x => {
                if (x.id === action.payload.id) {
                    x.title = action.payload.title;
                    return x;
                } else {
                    return x;
                }
            })};

        case 'FINISH_TODO':
            return {...state, toDos: state.toDos.map(x => {
                if (x.id === action.payload.id) {
                    x.done = true;
                    return x;
                } else {
                    return x;
                }
            })}

        default:
            return state;
    }
}

export default toDoReducer;