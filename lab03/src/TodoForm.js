import { connect } from "react-redux";
import { Field, Formik } from 'formik';
import {v4 as uuidv4} from 'uuid';

export const toDoFormReducer = (state = {}, action) => {
    switch(action.type){

        case 'ADD_TODO':
            return {...state, ...action.payload}

        default:
            return state
    }
}

const addTodo = (id, name, date) => {
    return {
        type: 'ADD_TODO',
        payload: {
            id,
            name,
            date: new Date(date),
            done: false
        }
    }
}

const initialValues = {
    id: uuidv4(),
    name: '',
    date: '',
}

const ToDoForm = () => {


    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(vals)=>console.log(vals)}
            >
                {({errors}) => (
                    <form style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px"}}>
                        <Field type="text" name="name" placeholder="ToDo name"></Field>
                        <Field type="date" name="date"></Field>
                        <button type="submit">Dodaj</button>
                    </form>
                )}
            </Formik>
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