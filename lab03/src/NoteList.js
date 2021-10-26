import { connect } from "react-redux";
import './styles/Notelist.scss'
import {v4 as uuidv4} from 'uuid';
import { Link } from "react-router-dom";


//--------------------Reducer
export const noteListReducer = (state = {
    notes:[{id: 1, text: "Myśl pozytywnie", author: "Antoni", date: new Date()}]
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
            date: new Date(),
            ...payload
        }
    }
}


//--------------------- Element Note List

const NoteList = ({notes}) => {

    return (
        <div className="notes">

            <h1>Notes<Link to="/notes/new"><button>Add +</button></Link></h1>

            <div className="space">
                {notes.length !== 0 ? notes.map(oneNote => <Link to={`/notes/${oneNote.id}/detail`} key={oneNote.id}><ul key={oneNote.id}>
                    <li>{oneNote.text}</li>
                    <li className="author">~{oneNote.author}</li>
                </ul></Link>) : `There is no notes here. Add first.`}
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