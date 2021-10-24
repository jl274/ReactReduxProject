import { Field, Formik, Form, ErrorMessage } from 'formik';
import { addTodo } from './ToDoList';
import { connect } from "react-redux";
import * as Yup from 'yup';


const ToDoForm = ({addTodo}, props) => {

    const handleSubmit = (name, date) => {
        addTodo(name, date);
    }

    const yupSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        date: Yup.date().min(new Date().toJSON().slice(0,10).replace(/-/g,'/'), "You can't add toDo about past events")
    })

    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    date: '',
                }}
                onSubmit={(val, {resetForm})=>{
                    // console.log(props)
                    handleSubmit(val.name, new Date(val.date));
                    resetForm();
                }}
                enableReinitialize="true"
                validationSchema={yupSchema}
            >
                {({errors}) => (
                    <Form style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px"}}>
                        <Field type="text" name="name" placeholder="ToDo name"></Field>
                        <Field type="date" name="date"></Field>
                        <button type="submit">Dodaj</button>
                        <ErrorMessage name="name" component="div"/>
                        <ErrorMessage name="date" component="div"/>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const mapDispatchToProps = {
    addTodo
};

export default connect(null, mapDispatchToProps)(ToDoForm);