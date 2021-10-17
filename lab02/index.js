/*
Zadanie 1. Stwórz projekt za pomocą `npm init` oraz dodaj do niego bibliotekę redux. Skonfiguruj store'a, 
który będzie przechowywał elementy to-do. Pojedynczy element ma mieć pola takie jak: id, title oraz done (typu boolean).
Stwórz reducer, który obsłuży poniższe operacje:

ADD_TODO - dodaje do store'a nowy element typu to-do
DELETE_TODO - usuwa element todo
UPDATE_TODO - aktualizuje tytuł elementu todo o danym id
FINISH_TODO - zmienia wartość flagi done na true w elemencie o danym id. 
*/

const Redux = require('Redux');

let store = Redux.createStore(toDoReducer);

// tak nie działa, czemu?
// const initial_state = {
//     toDos: []
// }

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

// subscription
store.subscribe(()=>{console.log(store.getState())})

// actions
// adding test
store.dispatch({type: 'ADD_TODO', payload: {id: 0, title: "Wash armpits", done: false}})
store.dispatch({type: 'ADD_TODO', payload: {id: 1, title: "Buy tomato", done: true}})
store.dispatch({type: 'ADD_TODO', payload: {id: 2, title: "Eat dinner", done: false}})
// deleting test (id=1)
store.dispatch({type: 'DELETE_TODO', payload: {id: 1}})
// editing test (id=0)
store.dispatch({type: 'UPDATE_TODO', payload: {id: 0, title: "Wash both armpits"}})
// finishing dinner test
store.dispatch({type: 'FINISH_TODO', payload: {id: 2}})