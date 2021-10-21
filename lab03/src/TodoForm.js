import { connect } from "react-redux";
import { Field, Formik } from 'formik';

export const toDoFormReducer = (state = [], action) => {
    switch(action.type){
        default:
            return state
    }
}

const ToDoForm = () => {


    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    date: '',
                }}
                onSubmit={(vals)=>console.log(vals)}
            >
                {({errors}) => (
                    <form>
                        <Field type="text" name="name"></Field>
                        <Field type="date" name="date"></Field>
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