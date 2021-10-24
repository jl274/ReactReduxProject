import { Field, Formik, Form, ErrorMessage } from 'formik';
import { addTodo, editToDo } from './ToDoList';
import { connect } from "react-redux";
import {hideToggle} from './toggling'
import * as Yup from 'yup';


const ToDoForm = ({addTodo, toggler, edit, editToDo, editedTodo, hideToggle}, props) => {

    const handleSubmit = (name, date) => {
        // addTodo(name, date);
        edit ? editToDo({...editedTodo, name, date}) : addTodo(name, date);
        hideToggle("edit")
    }

    const yupSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        date: Yup
                .date().min(new Date().toJSON().slice(0,10).replace(/-/g,'/'), "You can't add toDo about past events")
                .required('Date is required')
    })

    const initialFormValues = edit ? {
        name: editedTodo.name,
        date: editedTodo.date.toISOString().substr(0,10)
    }:{
        name: '',
        date: '',
    }

    return (
        <div>
            <Formik
                initialValues={initialFormValues}
                onSubmit={(val, {resetForm})=>{
                    // console.log(props)
                    handleSubmit(val.name, new Date(val.date));
                    edit || resetForm();
                }}
                enableReinitialize="true"
                validationSchema={yupSchema}
            >
                {({errors}) => (
                    <Form style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px"}}>
                        <Field type="text" name="name" placeholder="ToDo name"></Field>
                        <Field type="date" name="date"></Field>
                        <button type="submit" >{edit ? `Edit` : `Add`}</button>
                        <ErrorMessage name="name" component="div"/>
                        <ErrorMessage name="date" component="div"/>
                    </Form>
                )}
            </Formik>
            {/* {edit ? console.log(editedTodo.date.toJSON().slice(0,10).replace(/-/g,'/')) : null} */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        toggler: state.toggling,
        editedTodo: state.list.editActive
    }
}

const mapDispatchToProps = {
    addTodo,
    editToDo,
    hideToggle
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoForm);