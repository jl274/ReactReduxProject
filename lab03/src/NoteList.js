import { connect } from "react-redux";
import './styles/Notelist.scss'
import {v4 as uuidv4} from 'uuid';
import { Link } from "react-router-dom";


//--------------------Reducer
export const noteListReducer = (state = {
    notes:[]
}, action) => {

    switch(action.type){

        case 'ADD_NOTE':
            return {...state, notes: [...state.notes ,action.payload]}

        case 'DELETE_NOTE':
            return {...state, notes: state.notes.filter(x => x.id.toString() !== action.payload.id.toString())}

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

export const deleteNote = id => {
    return {
        type: 'DELETE_NOTE',
        payload: {
            id
        }
    }
}


//--------------------- Element Note List

const NoteList = ({notes, deleteNote}) => {

    const handleNoteDeletion = id => {
        deleteNote(id);
    }

    return (
        <div className="notes">

            <h1>Notes<Link to="/notes/new"><button>Add +</button></Link></h1>

            <div className="space">
                {notes.length !== 0 ? notes.map(oneNote => <div key={oneNote.id}>
                    <Link to={`/notes/${oneNote.id}/detail`}><ul>
                        <li>{oneNote.text}</li>
                        <li className="author">~{oneNote.author}</li>
                    </ul></Link>
                    <div className="delete" onClick={()=>{handleNoteDeletion(oneNote.id)}}>X</div>
                </div>) : `There are no notes here. Add first.`}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes.notes
    }
}

const mapDispatchToProps = {
    deleteNote
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);