import { connect } from "react-redux"

export const toDoFormReducer = (state = [], action) => {
    switch(action.type){
        default:
            return state
    }
}

const ToDoForm = () => {


    return (
        <div>
            test
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

    }
} 

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoForm)