/*
Zadanie 1. Stwórz projekt za pomocą `npm init` oraz dodaj do niego bibliotekę redux. Skonfiguruj store'a, 
który będzie przechowywał elementy to-do. Pojedynczy element ma mieć pola takie jak: id, title oraz done (typu boolean).
Stwórz reducer, który obsłuży poniższe operacje:

ADD_TODO - dodaje do store'a nowy element typu to-do
DELETE_TODO - usuwa element todo
UPDATE_TODO - aktualizuje tytuł elementu todo o danym id
FINISH_TODO - zmienia wartość flagi done na true w elemencie o danym id. 

Zadanie 2. Do istniejącego store'a dodaj przechowywanie notatek (notes). 
Zmodyfikuj istniejący reducer tak, aby obsługiwał poniższe operacje:

ADD_NOTE - dodaje notatkę o polach: id oraz content
DELETE_NOTE - usuwa notatkę o podanym id

Zadanie 3. Podziel istniejący reducer na dwa osobne - jeden dla elementów todo, a drugi do notes. Użyj funkcji `combineReducers(...)`, 
aby połączyć utworzone reducery i przekazać je do `createStore`.
*/

const Redux = require('Redux');

let store = Redux.createStore(Redux.combineReducers({toDoReducer, notesReducer}));

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

// subscription
store.subscribe(()=>{
    const state = store.getState();
    console.log(JSON.stringify(state));
})

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

// adding notes
store.dispatch({type: "ADD_NOTE", payload: {id: 0, content: "2 + 2 = 5"}});
store.dispatch({type: "ADD_NOTE", payload: {id: 1, content: "Kamil ślimak od tyłu to kamil ślimak"}});

// deleting note id=0
store.dispatch({type: "DELETE_NOTE", payload: {id: 0}});