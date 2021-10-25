import { connect } from "react-redux";
import './styles/Notelist.scss'
import {v4 as uuidv4} from 'uuid';


//--------------------Reducer
export const noteListReducer = (state = {
    notes:[{id: 1, text: "Myśl pozytywnie", author: "Antoni"}]
}, action) => {

    switch(action.type){

        case 'ADD_NOTE':
            return {...state, notes: [...state.notes ,action.payload]}

        default:
            return state
    }
}

//--------------------Actions
export const addNote = (payload) => {
    return {
        type: 'ADD_NOTE',
        payload: {
            id: uuidv4(),
            ...payload
        }
    }
}


//--------------------- Element Note List

const NoteList = ({notes}) => {

    return (
        <div className="notes">

            <h1>Notes</h1>

            <div className="space">
                {notes.map(oneNote => <ul key={oneNote.id}>
                    <li>{oneNote.text}</li>
                    <li className="author">~{oneNote.author}</li>
                </ul>)}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes.notes
    }
}

export default connect(mapStateToProps, null)(NoteList);