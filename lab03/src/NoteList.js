import { connect } from "react-redux";
import './styles/Notelist.scss'

export const noteListReducer = (state = {
    notes:[{id: 1, text: "Myśl pozytywnie", author: "Antoni"}]
}, action) => {

    switch(action.type){

        default:
            return state
    }
}

const NoteList = ({notes}) => {

    return (
        <div className="notes">

            <h1>Notes</h1>

            <div className="space">
                {notes.map(oneNote => <ul>
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