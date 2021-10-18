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

Zadanie 4. Spróbuj podzielić reducery i akcje na osobne pliki tak, aby każdy reducer znajdował się w osobnym pliku, 
a akcje dotyczące danej encji były zgrupowane w jednym pliku (np. TodoActions, NotesActions etc.)
*/
import toDoReducer from './todo/toDoReducer.js';
import notesReducer from './notes/notesReducer.js';
import { addTodo, deleteTodo, updateTodo, finishTodo} from './todo/toDoActions.js';
import { addNote, deleteNote} from './notes/notesActions.js';
import { createStore, combineReducers } from 'redux';


// const Redux = require('Redux');

let store = createStore(combineReducers({toDoReducer, notesReducer}));

// subscription
store.subscribe(()=>{
    const state = store.getState();
    console.log(JSON.stringify(state));
    console.log("\n");
});


//--------------- actions testing---------------//
// //adding test
store.dispatch(addTodo(0, "Wash armpits"));
store.dispatch(addTodo(1, "Buy Tomato"));
store.dispatch(addTodo(2, "Eat dinner"));

// // deleting test (id=1)
store.dispatch(deleteTodo(1));

// // editing test (id=0)
store.dispatch(updateTodo(0, "Wash both armpits"));

// // finishing dinner test
store.dispatch(finishTodo(2));

// // adding notes
store.dispatch(addNote(0, "2 + 2 = 5"));
store.dispatch(addNote(1, "Kamil ślimak od tyłu to kamil ślimak"));

// // deleting note id=0
store.dispatch(deleteNote(0));