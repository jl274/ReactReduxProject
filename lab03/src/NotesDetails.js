import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

const NotesDetail = ({notes}) => {

    return(
        <div className="detail">
            test
            {console.log(notes)}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { match: {params: {id}} } = ownProps;
    return {
        notes: state.notes.notes.find(x => x.id.toString() === id)
    }
}

export default withRouter(connect(mapStateToProps, null)(NotesDetail));