import { Field, Formik } from 'formik';
import {v4 as uuidv4} from 'uuid';


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

export default ToDoForm;