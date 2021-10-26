import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import './styles/NotesDetails.scss';

const NotesDetail = ({note}) => {

    return(
        <div className="detail">
            <div className="left">

                <ul>
                    <li>{note.text}</li>
                    <li className="author">~{note.author}</li>
                </ul>

            </div>

            <div className="right">

                <ul>
                    <li><Link to="/notes">Go back</Link></li>
                    <li><b>Id:</b> {note.id}</li>
                    <li><b>Author:</b> {note.author}</li>
                    <li><b>Creation date:</b> {note.date.toISOString().slice(0,10)},
                    {`\t`}{note.date.toLocaleTimeString()}</li>
                    <li><b>Text:</b> {note.text}</li>
                </ul>

            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { match: {params: {id}} } = ownProps;
    return {
        note: state.notes.notes.find(x => x.id.toString() === id)
    }
}

export default withRouter(connect(mapStateToProps, null)(NotesDetail));